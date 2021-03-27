WeighBridge V2.0
================

## To Build
mvn clean

set NODE_SKIP_PLATFORM_CHECK=1

mvn install

mvn validate -DskipValidate=validate

## To Run
java -jar target/WeighBridge.jar

## check fr latest maven dependency

mvn versions:display-dependency-updates

mvn versions:use-latest-releases

mvn versions:update-properties

## check for latest npm package

npm install -g npm-check-updates

ncu -u

npm update --max-old-space-size=8192 --force

## git Config

git config filter.app_jsx.clean "sed 's/^const INITIAL_URL.*/const INITIAL_URL = \"\";/g'"

git config filter.app_jsx.smudge cat
