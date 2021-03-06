#!/usr/bin/env sh

# 当发生错误时中止脚本
set -e

# 构建
npm run build:prd

# cd 到构建输出的目录下
cd dist

# 部署到自定义域域名
echo 'www.beafer.xyz' > CNAME

git init
git add -A
git commit -m 'deploy'

# 部署到 https://<USERNAME>.github.io
 #git push -f git@github.com:<markdaizi>/<markdaizi>.github.io.git/ #Zmaster

# 部署到 https://<USERNAME>.github.io/<REPO>
 git push -f git@github.com:markdaizi/yeah-form.git master:gh-pages

cd -