import mongoose from 'mongoose';

const fileRecordSchema = new mongoose.Schema(
  {
    originalName: {
      type: String,
      required: [true, 'Original file name is required'],
      trim: true
    },
    filename: {
      type: String,
      required: true,
      unique: true
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
    category: {
      type: String,
      enum: ['Document', 'Image', 'Assignment', 'Lab-Report', 'Other'],
      default: 'Document'
    },
    description: {
      type: String,
      trim: true,
      default: 'Uploaded via Multer File Module'
    },
    uploader: {
      type: String,
      default: 'Student'
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual for formatted human-readable file size (e.g., 2.45 MB)
fileRecordSchema.virtual('formattedSize').get(function () {
  if (this.size < 1024) return `${this.size} B`;
  if (this.size < 1024 * 1024) return `${(this.size / 1024).toFixed(1)} KB`;
  return `${(this.size / (1024 * 1024)).toFixed(2)} MB`;
});

export const FileRecord = mongoose.model('FileRecord', fileRecordSchema);
