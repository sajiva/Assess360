echo off
pushd src\main\webapp
echo /********************************************************/
echo /* Starting Watch of React Code                         */
echo /*                                                      */
echo /* Close if you want to stop this                       */
echo /********************************************************/
.\node_modules\.bin\webpack src/app.js --watch
popd