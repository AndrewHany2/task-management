import { Test } from '@nestjs/testing';
import { TaskService } from './task.service';
import { TaskRepository } from './task.repository';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { NotFoundException } from '@nestjs/common';

const mockUser = {
    id: 12,
    username: 'Test user',
};
const mockTaskRepository = () => ({
    getTasks: jest.fn(),
    findOne: jest.fn(),
    createTask: jest.fn(),
    deleteTask: jest.fn()
})

describe(('Tasks Service'), () => {
    let taskService;
    let taskRepository;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                TaskService,
                { provide: TaskRepository, useFactory: mockTaskRepository }
            ]
        }).compile();
        taskService = await module.get<TaskService>(TaskService);
        taskRepository = await module.get<TaskRepository>(TaskRepository);
    });

    describe('getTasks',()=>{
        it('gets all tasks from the repository', async () => {
            taskRepository.getTasks.mockResolvedValue('someValue');
            expect(taskRepository.getTasks).not.toHaveBeenCalled();
            const filters: GetTasksFilterDto = { status: TaskStatus.IN_PROGRESS, search: 'Some search query' };
            const result = await taskService.getTasks(filters, mockUser);
            expect(taskRepository.getTasks).toHaveBeenCalled();
            expect(result).toEqual('someValue');
        })
    })

    describe('getTaskById', ()=>{
        const mockTask = { title: 'Test', description: 'Test' };
        it('calls taskRepository.findOne and successfully get and return the task', async ()=>{
            taskRepository.findOne.mockResolvedValue(mockTask);
            const result = await taskService.getTaskById(1, mockUser);
            expect(result).toEqual(mockTask);
            expect(taskRepository.findOne).toHaveBeenCalledWith({ where: { id: 1, userId: mockUser.id } })
        }); 

        it('throws an error as task not found', ()=>{
            taskRepository.findOne.mockResolvedValue(null);
            expect(taskService.getTaskById(1, mockUser)).rejects.toThrow(NotFoundException);
        })
    })

    describe('create task', ()=>{
        it('calls taskRepository.create() and retruns the result', async () => {
            taskRepository.createTask.mockResolvedValue('someTask')
            expect(taskRepository.createTask).not.toHaveBeenCalled();
            const createTaskDto = { title:"Test task", description: 'Test desc'};
            const result = await taskService.createTask(createTaskDto, mockUser);
             expect(taskRepository.createTask).toHaveBeenCalledWith(createTaskDto, mockUser);
            expect(result).toEqual('someTask');
        })
    })

    describe('delete task', ()=>{
        it('calls taskRepository.deleteTask() to delete a task', async () => {
            taskRepository.deleteTask.mockResolvedValue({ affected: 1 });
            expect(taskRepository.deleteTask).not.toHaveBeenCalled();
            await taskService.deleteTask(1, mockUser);
            expect(taskRepository.delete).toHaveBeenCalledWith({id: 1, userId: mockUser.id});
        });

        it('throws an error as as task could not be found', ()=>{
            taskRepository.deleteTask.mockResolvedValue({ affected: 0 });
            expect(taskService.deleteTask(1, mockUser)).rejects.toThrow(NotFoundException);
        })
    })

    describe('update task', () => {
        it('updates a task status', async () => {
            const save = jest.fn().mockResolvedValue(true);
            taskService.getTaskById = jest.fn().mockResolvedValue({
                status: TaskStatus.OPEN,
                save
            });
            expect(taskService.getTaskById).not.toHaveBeenCalled(); 
            const result = await taskService.updateTaskStatus(1, TaskStatus.DONE, mockUser);
            expect(taskService.getTaskById).toHaveBeenCalled();
            expect(save).toHaveBeenCalled();
            expect(result.status).toEqual(TaskStatus.DONE);
        });

    })
})