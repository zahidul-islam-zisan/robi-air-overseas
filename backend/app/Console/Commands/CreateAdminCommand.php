<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class CreateAdminCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'admin:create';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new Administrator account with admin role';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info('--- Robi Air Overseas Admin Account Creation ---');

        $name = $this->ask('Enter Admin Name');
        $email = $this->ask('Enter Admin Email');
        $password = $this->secret('Enter Admin Password');
        $passwordConfirmation = $this->secret('Confirm Admin Password');

        $validator = Validator::make([
            'name' => $name,
            'email' => $email,
            'password' => $password,
            'password_confirmation' => $passwordConfirmation,
        ], [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        if ($validator->fails()) {
            $this->error('Admin creation failed due to validation errors:');
            foreach ($validator->errors()->all() as $error) {
                $this->error(" - {$error}");
            }
            return Command::FAILURE;
        }

        $admin = User::create([
            'name' => $name,
            'email' => strtolower(trim($email)),
            'password' => Hash::make($password),
            'role' => 'admin',
        ]);

        $this->info("Admin account created successfully!");
        $this->line(" - Name: {$admin->name}");
        $this->line(" - Email: {$admin->email}");
        $this->line(" - Role: {$admin->role}");

        return Command::SUCCESS;
    }
}
