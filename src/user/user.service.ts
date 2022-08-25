import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User)
    private usersRepository: Repository<User>
    ) { }



    async login(email: string, password: string): Promise<User> {
        const user: User | undefined = await this.usersRepository.findOne({
            where: {
                email,
                password
            },
            relations: {
                friends: true
            }
        });

        if (!user) {
            throw new UnauthorizedException('Nom de compte ou mot de passe incorrect');
        }


        return user;
    }

    async signup(email: string, password: string): Promise<User> {
        // vérifier que l'utilisateur n'existe pas
        const exist = await this.userExist(email);
        if (exist) {
            throw new ConflictException("L'email indiqué existe déjà!");
        }

        const user: User = this.usersRepository.create({
            email, password
        });

        return this.usersRepository.save(user);
    }

    async deleteById(id: number): Promise<void> {
        // vérifier que l'utilisateur n'existe pas
        const exist = await this.userExistById(id);
        if (!exist) {
            throw new NotFoundException("Utilisateur introuvable!");
        }
        this.usersRepository.delete(id);
    }

    getAllUsers(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async getUserById(id: number): Promise<User> {

        return this.usersRepository.findOne({
            where: {
                id,
            },
            relations: {
                friends: true
            }
        });
    }

    async emailExists(email: string): Promise<boolean> {
        console.log('email reçu', email)
        const user: User | undefined = await this.usersRepository.findOne({
            where: {
                email,
            }
        });

        if (user) {
            return true;
        }

        return false;
    }

    async updateUser(id: number, email: string, password: string): Promise<User> {
        const exist = await this.userExistById(id);
        if (!exist) {
            throw new NotFoundException("Utilisateur introuvable!");
        }

        const user: User = this.usersRepository.create({
            email, password
        });

        await this.usersRepository.update(id, user);
        return this.usersRepository.findOne({
            where: { id }
        });
    }

    async updateProfil(id: number, lastName: string, firstName: string, dateOfBirth: Date): Promise<User> {
        const exist = await this.userExistById(id);
        if (!exist) {
            throw new NotFoundException("Utilisateur introuvable!");
        }

        const user: User = this.usersRepository.create({
            lastName, firstName, dateOfBirth
        });

        await this.usersRepository.update(id, user);
        return this.usersRepository.findOne({
            where: { id }
        });
    }

    async userExistById(id: number): Promise<User> {
        return this.usersRepository.findOne({
            where: {
                id
            }
        });
    }

    private async userExist(email: string): Promise<boolean> {
        const user: User | undefined = await this.usersRepository.findOne({
            where: {
                email
            }
        });

        return !!user;
    }

    async addFriendById(userId: number, friendId: number): Promise<User> {
        const user = await this.getUserById(userId);
        const friend = await this.getUserById(friendId);

        if (user && friend) {
            user.friends.push(friend);
            await this.usersRepository.save(user);
        }

        return user;
    }
}
