特点：
=====
1、存储模式
CVS/SVN/VSS
集中式管理：代码仓库必须要依赖于一台中央服务器和网络的介入——安全性和操作性较差（大家共享一台代码服务器）

GIT
分布式管理：代码仓库可以随意复制在任何位置（U盘，磁盘，网络服务器）——安全性和操作性较好（每一个代码仓库都是独立的）

2、管理模式
代码分由三个阶段去维护（可以轻松实现文件的快照/镜像、比较和索引维护）

 分区        状态               操作
工作区    Untracked（未跟踪）   需要加入暂存——通过命令add
暂存区    Staged（已暂存）      需要提交仓库——通过命令commit
仓库区    Commited（已提交）

----------------------------------------------------------------------------------

查看版本
git --version

查看常用命令
git --help

查看所有命令
git help -a（按q退出）

查看某个命令具体帮助（例如查看提交命令）
git help commit
git commit --help

-----------------------------------------------------------------------------

将源码所在目录初始化为一个代码仓库
cd进入到源码所在目录
git init（会创建一个.git文件夹，该文件夹是隐藏的，这个里面就是仓库，通过dir /ah查看）

查看当前工作区的文件状态（哪些文件尚未暂存，哪些文件被暂存但尚未提交，哪些文件被修改、重命名、移除）
git status
红色：尚未被暂存
绿色：已经被暂存（尚未被提交）

取消被暂存的文件（因为可能还要继续编辑，代码没写完）
git rm --cached style.css

有些二进制文件、大文件、临时文件、备份文件、或者不需要被仓库管理的文件
可以把它们列入一个忽略列表中，这样git status就不会总是以红色提醒这些文件尚未暂存
1、创建忽略列表文件(在仓库根目录下，文件名为：.gitignore)
2、在此文件中，每行一条要被忽略的文件名

注意：只有绿色的文件/目录，在commit提交时，才会被写入仓库！

-----------------------------------------------------------------------

设置当前仓库的提交用户（姓名和邮箱）
git config user.email "yufeng@163.com"
git config user.name "yufeng"

查看当前仓库的提交用户
git config user.email
git config user.name

或者
设置全局仓库的提交用户（当前主机上的所有仓库都共享的姓名和邮箱）
在当前仓库没有设置提交用户时，就使用全局的！
git config --global user.name "itany"
git config --global user.email "itany@163.com"
查看全局的提交用户
git config --global user.email
git config --global user.name

git config --global -l

--------------------------------------------------------------------------------

commit  暂存区内容写入仓库区（不能再捡出某些提交——暂存区必须全部提交）
git commit -m "init project"

删除仓库中的文件
方法一：
1、先从文件系统中删掉
del src\c.txt
2、通知暂存,该文件被删除
git add .
3、提交,通知仓库区也同步删除
git commit -m "del src\c.txt"

方法二：
1、直接通过git的rm命令，删除仓库和工作区文件（这时暂存区已经知道该文件被移除）
git rm src\b.txt
2、直接提交即可
git commit -m "del src\b.txt"

重命名文件
1、先把工作区文件重命名
move style.css mystyle.css
2、加入暂存区
git add .（或者git add 重命名前的文件名，再git add 重命名后的文件名，git也会自动侦测出这是一个rename操作）
3、提交通知仓库区同步
git commit -m "rename style.css to mystyle.css"

---------------------------------------------------------------------------

实现三个区之间的文件比较

仓库区 ： <hr />
工作区 ： <hr color="blue" />
暂存区 ： <hr color="red" />

比较暂存区和工作区
git diff hello.htm

比较暂存区和仓库区
git diff --cached hello.htm

比较工作区和仓库区
git diff HEAD hello.htm

总结：在进行比较时，颜色为绿色的是两个比较区离你近的区，相对远的是红色！

-------------------------------------------------------------------------------

日志查看
git log（内容包括提交的id，用户，邮箱，时间，内容注释）

筛选最近的3条日志
git log -3

查看指定用户的提交
git log --author yufeng

查看指定时间之后的日志
git log --after "Mon Jul 22 14:40:00 2019 +0800"

查看指定时间之前的日志
git log --before "Mon Jul 22 14:40:00 2019 +0800"

查看指定时间段内的日志
git log --before "Mon Jul 22 14:50:00 2019 +0800" --after "Mon Jul 22 14:40:00 2019 +0800"

查看指定时间段内某个用户的日志
git log --before "Mon Jul 22 14:50:00 2019 +0800" --after "Mon Jul 22 14:40:00 2019 +0800" --author yufeng

-----------------------------------------------------------------------------

代码的回溯

先通过查看日志，定位你要回溯的提交id
git log --pretty=oneline

使用reset回溯整个工作区
=====================
1、取消工作区的任何改动，回溯到仓库区的最新版
git reset --hard

2、将工作区回溯到仓库区的指定提交
git reset --hard d4cec9

使用checkout回溯某个文件
======================
3、只将某个文件回溯到仓库的最新版
git checkout -- hello.htm

4、只将某个文件回溯到仓库的指定版
git checkout 09285c -- hello.htm

注意：
    如果你现在在当今社会，回到了明朝，那么你通过git log看不见清朝历史！
    只能通过git reflog查看所有的时间轴，才能看见清朝的时间点！
    再通过如下命令从明朝进入到清朝！
    git reset --hard 27de118

总结：使用git可以任意往前或者往后回溯！

---------------------------------------------------------------------------------

分支

现在有一个项目已经开发到一稳定阶段，
这时出现两个问题：
1、出现bugs，需要专人立即维护
2、客户提出新的需求，需要扩展功能
这两个任务需要同时进行，又不相互影响
这就需要分支，在当前版本上，开辟两个分支
一个用于更新bugs，一个用于新功能
不管哪个分支开发完毕，和当前版本进行合并
这样做的好处是，
既不影响当前任务的前进，
又不影响当前项目的发布！

查看自己当前所在分支
git branch

新开辟分支
git branch new_feature
git branch fix_bugs

所谓新分支，其实就是当前分支的一个镜像！
所以你在子分支上的操作就是在当前主分支上操作，但是所有修改在合并之前不影响主分支！

重命名分支
git branch -m new_feaure new_feature

切换到new_feature分支，添加新的功能
git checkout new_feature
通过git branch查看是否已经位于要修改的new_feature分支上（星号绿色）

将new_feature分支合并到master主分支
注意：你要合并到哪个分支，首先要位于合并到的分支上！
这里我们应该位于master分支上执行合并
git checkout master
git merge new_feature

经验：
master作为主分支，不会直接对其进行修改和提交，
而是在它的基础上开辟新分支用于修改或者扩展，
之后的操作都是针对新辟分支做提交，
然后将修改分支或者扩展分支，合并到master主分支上发布新版本！

删除分支
git branch -d fix_bugs

不能删除当前正在位于的分支（不能删除正在星号绿色的分支）
不能删除尚未和其它分支合并的分支（子分支已经有内容提交了，但是尚未合并）

强制删除尚未合并的分支
git branch -D new_feature

------------------------------------------------------------------------
分支

查看分支
git branch 

新建分支
git branch bugs_fix

选择切入分支
git checkout master

重命名分支
 git branch -m bugs_fix bugs

 合并分支
 git merge bugs

 删除分支
 git branch -d bugs
------------------------------------------------------------------------
分支冲突解决





