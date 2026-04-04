const mongoose = require('mongoose');

const storySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Story title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
      minlength: [3, 'Title must be at least 3 characters'],
    },
    content: {
      type: String,
      required: [true, 'Story content is required'],
      maxlength: [50000, 'Content cannot exceed 50,000 characters'],
      minlength: [10, 'Content must be at least 10 characters'],
    },
    author: {
      type: String,
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    excerpt: {
      type: String,
      default: '',
      maxlength: [300, 'Excerpt cannot exceed 300 characters'],
    },
    readingTime: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    published: {
      type: Boolean,
      default: true,
    },
    tags: {
      type: [String],
      default: [],
      maxlength: [10, 'Cannot have more than 10 tags'],
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient querying
storySchema.index({ authorId: 1 });
storySchema.index({ createdAt: -1 });
storySchema.index({ featured: 1 });
storySchema.index({ published: 1 });
storySchema.index({ title: 'text', content: 'text' });

// Calculate reading time before saving
storySchema.pre('save', function (next) {
  const wordCount = this.content.split(/\s+/).length;
  this.readingTime = Math.ceil(wordCount / 200);

  if (!this.excerpt) {
    const plainText = this.content.replace(/<[^>]*>/g, '');
    this.excerpt = plainText.substring(0, 150).concat(
      plainText.length > 150 ? '...' : ''
    );
  }

  next();
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;
