# Git

Traer cosas del repositorio remoto:

```
git fetch
```



## Branch

## Copy content to other branch

```
git checkout dev
git pull
git checkout destino
git merge dev
```



### Create a branch

```
git checkout -b <name-of-branch>
```

### Switch to an existing branch

```
git checkout <name-of-branch>
```

### Send changes

```
git push <remote> <name-of-branch>
```

For example, to push your local commits to the *`master`* branch of the *`origin`* remote:

```
git push origin master
```

### Delete all changes in the branch

```
git checkout .
```

### Merge a branch with master branch

```
git checkout <name-of-branch>
git merge master
```

## Discard Changes

### Not pushed to a remote repository

Discard all local changes, but save them for possible re-use [later](https://docs.gitlab.com/ee/topics/git/numerous_undo_possibilities_in_git/#quickly-save-local-changes):

```
git stash
```

Discarding local changes (permanently) to a file:

```
git checkout -- <file>
```

Discard all local changes to all files permanently:

```
git reset --hard
```

### Undo changes after they are pushed to a remote repository

If you want to revert changes introduced in certain `commit-id` you can simply revert that `commit-id` (swap additions and deletions) in newly created commit: You can do this with

```
git revert commit-id
```

or creating a new branch:

```
git checkout commit-id
git checkout -b new-path-of-feature
```

 ## Others

### Unstage all changes that have been added to the staging area

```
git reset .
```

### Undo most recent commit

```
git reset HEAD~1
```