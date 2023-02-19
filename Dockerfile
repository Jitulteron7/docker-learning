FROM node:17

# recommended but not necessary
WORKDIR /app

# after package.json we need to specify the directory to which we want to copy (here . means current dir which in this case is /app 
# also if it is /app also then it will work same as .)
COPY package.json .
RUN yarn install 
# can be . or ./ 
# to copy everything (all the src code) from current dir to docker image 
# note: We have to seperate COPY one for package.json and another for src code
# We did this cause by seperating package.json and src code copy when ever code changes and if package.json does not it will only run copy . ./ not 
# package.json. Which will optimize our docker process 
#note :docker caches all the steps for optimization and only if there is a change in one of the steps. then only it will work.
#node : this  line copy everything from our current dir which is a bad thing. To ignore some unwanted file we use docker ignore file
COPY . ./ 
# we are running in port 3000
EXPOSE 3000

# what command to run
# node index.js
CMD ["npm","run","dev"]
# after implementation of volume
#note :after deleting node_module from the current dir and then run docker container. It will show that docker nodemon is not present 
# This is because after volume implementaion it syncs with the current dir fils which results to override the /app node_module. So after deleting node_module it does not detect it so it throws error
# for this prob we add another volument which specifies to not override /app files