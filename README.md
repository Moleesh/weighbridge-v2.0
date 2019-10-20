WeighBridge V2.0
================

## To Build 
npm i -g react-scripts 
mvn clean package verify
mvn clean package verify -DskipUpdate=clean

## To Run
java -jar target/WeighBridge.jar

## check fr latest maven dependency 
mvn versions:display-dependency-updates
 
mvn versions:use-latest-releases

mvn versions:update-properties

## git Config
git config filter.app_jsx.clean "sed 's/^const INITIAL_URL.*/const INITIAL_URL = "";/g'"

git config filter.app_jsx.smudge cat
