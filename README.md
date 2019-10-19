WeighBridge V2.0
================

## To Build 
npm -ig react-scripts 
mvn clean install package

## To Run
java -jar target/WeighBridge.jar

## check fr latest maven dependency 
mvn versions:display-dependency-updates
 
mvn versions:use-latest-releases

mvn versions:update-properties

## git Config
git config filter.app_jsx.clean "sed '/^INITIAL_URL.*/'d"

git config filter.app_jsx.smudge cat
