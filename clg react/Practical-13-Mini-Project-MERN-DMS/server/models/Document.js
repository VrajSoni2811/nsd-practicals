import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema(
  {
    docId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    title: {
      type: String,
      required: [true, 'Document title is required'],
      trim: true
    },
    description: {
      type: String,
      trim: true,
      default: 'Enterprise archival document.'
    },
    category: {
      type: String,
      required: true,
      enum: ['Technical', 'Legal', 'Financial', 'HR', 'Engineering', 'Architecture'],
      default: 'Technical'
    },
    securityClassification: {
      type: String,
      required: true,
      enum: ['Public', 'Internal', 'Confidential', 'Restricted'],
      default: 'Internal'
    },
    version: {
      type: String,
      default: 'v1.0'
    },
    filename: {
      type: String,
      required: true
    },
    originalName: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    mimetype: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: true
    },
    author: {
      type: String,
      required: true,
      trim: true
    },
    department: {
      type: String,
      required: true
    },
    tags: [String],
    downloadCount: {
      type: Number,
      default: 0
    },
    isArchived: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual for formatted human-readable size
documentSchema.virtual('formattedSize').get(function () {
  if (this.size < 1024) return `${this.size} B`;
  if (this.size < 1024 * 1024) return `${(this.size / 1024).toFixed(1)} KB`;
  return `${(this.size / (1024 * 1024)).toFixed(2)} MB`;
});

export const Document = mongoose.model('Document', documentSchema);
