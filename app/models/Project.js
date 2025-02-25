import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    Commodity: {
        type: String
    },
    Secondary_Commodity: {
        type: String
    },
    Tertiary_Commodity: {
        type: String
    },
    Country: {
        type: String
    },
    'Tenement Area': {
        type: String
    },
    Status: {
        type: String
    },
    'Most Advanced Tool': {
        type: String
    },
    'Project Name': {
        type: String
    },
    Notes: {
        type: String
    },
    'Deal Sought by Owner': {
        type: String
    },
    'Data Room link': {
        type: String
    }
}, {
    timestamps: true
});

// Add single-field indexes with case-insensitive collation
ProjectSchema.index({ 'Project Name': 1 }, { collation: { locale: 'en', strength: 2 } });
ProjectSchema.index({ Commodity: 1 }, { collation: { locale: 'en', strength: 2 } });
ProjectSchema.index({ Secondary_Commodity: 1 }, { collation: { locale: 'en', strength: 2 } });
ProjectSchema.index({ Tertiary_Commodity: 1 }, { collation: { locale: 'en', strength: 2 } });
ProjectSchema.index({ Country: 1 }, { collation: { locale: 'en', strength: 2 } });
ProjectSchema.index({ Status: 1 }, { collation: { locale: 'en', strength: 2 } });
ProjectSchema.index({ 'Most Advanced Tool': 1 }, { collation: { locale: 'en', strength: 2 } });
ProjectSchema.index({ 'Deal Sought by Owner': 1 }, { collation: { locale: 'en', strength: 2 } });
ProjectSchema.index({ Notes: 1 }, { collation: { locale: 'en', strength: 2 } });

// Prevent model recompilation error in development
const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

export default Project;