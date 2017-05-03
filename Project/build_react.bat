echo off

pushd src\main\webapp

echo /********************************************************/
echo /* Deleting Index.js                                    */
echo /********************************************************/
del index.js

echo.
echo.
echo /********************************************************/
echo /* Rebuilding Index.js                                  */
echo /********************************************************/
call .\node_modules\.bin\webpack main.js

popd