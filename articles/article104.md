#learning-git
# Git Basics

Git is a distributed version control system that helps you track changes to your files, collaborate with others, and manage your project's history. Here are some basic Git commands:

## Initialization
To start using Git in a project, you need to initialize a Git repository:

```bash
git init
```

This command creates a new Git repository in the current directory.

## Cloning
To clone an existing repository from a remote server (like GitHub), use:

```bash
git clone <repository_url>
```

For example:

```bash
git clone https://github.com/user/repository.git
```

## Adding Files
To add files to the staging area (prepare them for commit), use:

```bash
git add <file>
```

You can also add all files in the current directory and its subdirectories:

```bash
git add .
```

## Committing Changes
To commit changes to the repository, use:

```bash
git commit -m "Your commit message"
```

This creates a commit with a message describing the changes you've made.

## Pushing Changes
To push your commits to a remote repository (like GitHub), use:

```bash
git push origin <branch_name>
```

For example, to push to the main branch:

```bash
git push origin main
```

## Summary
- `git init`: Initialize a new Git repository.
- `git clone <repository_url>`: Clone an existing repository.
- `git add <file>`: Add a file to the staging area.
- `git commit -m "Your commit message"`: Commit changes to the repository.
- `git push origin <branch_name>`: Push changes to a remote repository.

These are some of the basic Git commands to get you started with version control in your projects.