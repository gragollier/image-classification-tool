# Image Classification Tool
A simple Node and Express based tool for generating image classification datasets

## Why?
After starting experimenting with machine learning and artificial neural networks, I wanted to try some models on datasets of my own. However, I quickly realized that there weren't any easy to use tools for generating these datasets that were both free and locally hosted. Thus, I created this simple tool for my own use and realized it may be helpful for others as well.

## Usage
1. Move all your images into the `images` directory at the top level

2. Insert the classes that you'd like to classify over in the `config.json` file. An example is provided with the classes Cat and Dog. You can add as many classes as you'd like

3. Setup the Node environment by running
    ```shell
    $> npm install --save
    ```
    *Note: If you don't have Node you can find instructions to install it [here](https://nodejs.org)*

4. Start the server
    ```shell
    $> node index.js
    ```
5. Open your web browser and navigate to [http://localhost:8080](http://localhost:8080)

6. (Optional) After classifying your images you can run the python script `file_mover.py` to move all images to subfolders corresponding to their classification.
    ```shell
    $> python file_mover.py
    ```
    *Note: This script was tested using Python 3.7*
    
    Otherwise read the classifications directly from the SQLite3 database `images.db`

## TODO's
* Remove use of Bootstrap for the website as it's not really needed
* (Maybe) Move server port binding to `config.json`