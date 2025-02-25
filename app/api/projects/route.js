import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import Project from '@/app/models/Project';

export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);

    // Build query object
    const query = {};

    // Enhanced search using regex instead of text index
    const searchTerm = searchParams.get('search');
    if (searchTerm && searchTerm.trim()) { // Only add search conditions if searchTerm exists and is not empty
      query.$or = [
        { 'Project Name': { $regex: searchTerm, $options: 'i' } },
        { Commodity: { $regex: searchTerm, $options: 'i' } },
        { Secondary_Commodity: { $regex: searchTerm, $options: 'i' } },
        { Tertiary_Commodity: { $regex: searchTerm, $options: 'i' } },
        { Country: { $regex: searchTerm, $options: 'i' } }
      ];
    }

    // Filter by primary commodity with case-insensitive regex
    const primaryCommodity = searchParams.get('primaryCommodity');
    if (primaryCommodity) {
      const commodities = primaryCommodity.split(',');
      query.Commodity = {
        $in: commodities.map(commodity => new RegExp(`^${commodity}$`, 'i'))
      };
    }

    // Filter by secondary commodity with case-insensitive regex
    const secondaryCommodity = searchParams.get('secondaryCommodity');
    if (secondaryCommodity) {
      const commodities = secondaryCommodity.split(',');
      query.Secondary_Commodity = {
        $in: commodities.map(commodity => new RegExp(`^${commodity}$`, 'i'))
      };
    }

    // Filter by tertiary commodity with case-insensitive regex
    const tertiaryCommodity = searchParams.get('tertiaryCommodity');
    if (tertiaryCommodity) {
      const commodities = tertiaryCommodity.split(',');
      query.Tertiary_Commodity = {
        $in: commodities.map(commodity => new RegExp(`^${commodity}$`, 'i'))
      };
    }

    // Filter by status with case-insensitive regex
    const status = searchParams.get('status');
    if (status) {
      const statuses = status.split(',');
      query.Status = {
        $in: statuses.map(s => new RegExp(`^${s}$`, 'i'))
      };
    }

    // Filter by country with case-insensitive regex
    const country = searchParams.get('countries');
    if (country) {
      const countries = country.split(',');
      query.Country = {
        $in: countries.map(c => new RegExp(`^${c}$`, 'i'))
      };
    }

    // Filter by deal type with case-insensitive regex
    const dealType = searchParams.get('dealTypes');
    if (dealType) {
      const dealTypes = dealType.split(',');
      query['Deal Sought by Owner'] = {
        $in: dealTypes.map(type => new RegExp(`^${type}$`, 'i'))
      };
    }

    // Filter by most advanced tool with case-insensitive regex
    const tool = searchParams.get('mostAdvancedTools');
    if (tool) {
      const tools = tool.split(',');
      query['Most Advanced Tool'] = {
        $in: tools.map(t => new RegExp(`^${t}$`, 'i'))
      };
    }

    // Pagination
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;

    // Execute query
    const [projects, total] = await Promise.all([
      Project.find(query)
        .skip(skip)
        .limit(limit)
        .lean(),
      Project.countDocuments(query)
    ]);

    return NextResponse.json({
      projects,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}