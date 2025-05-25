import mongoose, { model, Schema, Document } from 'mongoose';

export interface ITask {
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITaskDocument extends ITask, Document {}

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: [100, 'Название не может быть длиннее 100 символов']
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export const TaskModel = model<ITaskDocument>('Task', taskSchema); 