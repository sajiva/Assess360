echo off
echo /********************************************************/
echo /* Build Project                                        */
echo /********************************************************/
call gradlew build

cd src/main/webapp

echo.
echo.
echo /********************************************************/
echo /* Installing Node Package Manager Dependencies         */
echo /********************************************************/
npm install

popd

echo.
echo.
echo /********************************************************/
echo /* Starting Constant Watch of React Code                */
echo /********************************************************/
sh start_react.sh




echo on

