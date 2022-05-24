import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User)
    private usersRepository: Repository<User>,
    ) { }

    async login(email: string, password: string): Promise<boolean> {
        const user: User | undefined = await this.usersRepository.findOne({
            where: {
                email,
                password
            }
        });

        if (!user) {
            throw new UnauthorizedException('Nom de compte ou mot de passe incorrect');
        }


        return true;
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
        const user: User = this.usersRepository.create({
            email, password
        });

        await this.usersRepository.update(id, user);
        return this.usersRepository.findOne({
            where: { id }
        });
    }

    private async userExistById(id: number): Promise<boolean> {
        const user: User | undefined = await this.usersRepository.findOne({
            where: {
                id
            }
        });

        return !!user;
    }

    private async userExist(email: string): Promise<boolean> {
        const user: User | undefined = await this.usersRepository.findOne({
            where: {
                email
            }
        });

        return !!user;
    }

}
