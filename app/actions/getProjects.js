export async function getProjects({ search, page, limit }) {
    const params = new URLSearchParams({
        ...(search && { search }),
        page,
        limit,
    });

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects?${params}`, {
        cache: "no-store", // Ensures fresh data on every request (SSR)
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }

    return response.json();
}