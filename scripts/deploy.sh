#! /bin/sh
mv dist $2
name='root'
pass='2wsx!QAZ'
expect -c "
    spawn scp -r $2 $name@192.168.155.56:/data1/app/html/$1/
    expect {
        \"*assword\" {set timeout 300; send \"$pass\r\"; exp_continue;}
        \"yes/no\" {send \"yes\r\";}
    }
expect eof"
