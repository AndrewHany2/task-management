import { Test } from '@nestjs/testing';
import { TaskService } from './task.service';
import { TaskRepository } from './task.repository';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';

const mockUser = {
    id:12,
    username: 'Test user',
};
const mockTaskRepository = () => ({
    getTasks: jest.fn(),
    findOne: jest.fn()
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

    describe('getTaskById',()=>{
        const mockTask = { title: 'Test', description: 'Test' };
        it('calls taskRepository.findOne and successfully get and return the task', async ()=>{
            taskRepository.findOne.mockResolvedValue(mockTask);
            const result = await taskService.getTaskById(1, mockUser);
            expect(result).toEqual(mockTask);
            expect(taskRepository.findOne).toHaveBeenCalledWith({ where: { id: 1, userId: mockUser.id } })
        }); 

        it('throws an error as task not found', ()=>{
            taskRepository.findOne.mockResolvedValue(null);
            expect(taskService.getTaskById(1, mockUser)).rejects.toThrow();
        })
    })
})