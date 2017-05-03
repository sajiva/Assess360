echo off
echo /********************************************************/
echo /* Build Project                                        */
echo /********************************************************/
call gradlew build

pushd src\main\webapp

echo.
echo.
echo /********************************************************/
echo /* Installing Node Package Manager Dependencies         */
echo /********************************************************/
call npm install

popd

echo.
echo.
echo /********************************************************/
echo /* Starting Constant Watch of React Code                */
echo /********************************************************/
start start_react




echo on

