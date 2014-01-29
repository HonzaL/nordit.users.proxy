#!/bin/sh

RUNDIR=$(pwd)
BASEDIR=$(dirname $0)

cd $BASEDIR

../cron.js > ../cron.log 2>&1

cd $RUNDIR
