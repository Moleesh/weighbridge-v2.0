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

npm update --max-old-space-size=8192 --depth 20
