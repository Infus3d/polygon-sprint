let levels = {
    "easy" : {
        "backgroundImage" : "background_easy.png",
        "01": {
            "id" : "01",
            "columns" : 30,
            "rows" : 20,

            "doors" : [
                {
                    "tile_x" : -1,
                    "tile_y" : 0,
                    "width"  : 32,
                    "height" : 64,
                    "destination_room" : "02",
                    "destination_tile_x" : 29,
                    "destination_tile_y" : 17
                },
                {
                    "tile_x" : 30,
                    "tile_y" : 0,
                    "width" : 32,
                    "height" : 960,
                    "destination_room" : "03",
                    "destination_tile_x" : 0,
                    "destination_tile_y" : -69
                }
            ],
            "coins" : [
                [7, 1],
                [19, 9],
                [11, 11],
                [28, 15]
            ],
            "flies" : [],
            "slimes" : [],
        
            "map" : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                53, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                104, 104, 104, 104, 104, 105, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                153, 153, 153, 153, 153, 0, 0, 0, 129, 105, 0, 0, 0, 0, 69, 57, 57, 57, 57, 57, 45, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                153, 153, 153, 153, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 117, 104, 104, 104, 0, 0,
                153, 153, 153, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 133, 133, 0, 0, 0, 0, 0, 0, 0, 0, 153, 153, 153, 0, 41,
                153, 153, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 133, 133, 133, 0, 0, 0, 0, 0, 0, 0, 153, 153, 153, 104, 104,
                153, 0, 0, 0, 0, 0, 81, 0, 0, 0, 0, 81, 0, 0, 116, 104, 104, 104, 104, 92, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                153, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 69, 45, 0, 0, 0, 0, 0, 0, 0,
                153, 0, 0, 0, 0, 0, 0, 0, 0, 81, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                153, 0, 0, 0, 81, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 69, 57, 57, 45, 0, 0, 0,
                153, 0, 0, 0, 0, 0, 0, 81, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                153, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 41,
                153, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 129, 104, 104,
                153, 104, 104, 104, 104, 104, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 117, 104, 104, 104, 93, 0, 0, 0, 0, 0, 0, 0, 153,
                153, 153, 153, 153, 153, 153, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 153, 153, 153, 0, 0, 0, 0, 0, 0, 0, 0, 153,
                153, 153, 153, 153, 153, 153, 104, 104, 104, 105, 0, 0, 69, 57, 45, 0, 0, 0, 153, 153, 153, 0, 0, 0, 129, 104, 104, 104, 104, 153,
                153, 153, 153, 153, 153, 153, 153, 153, 153, 0, 0, 0, 0, 0, 0, 0, 0, 0, 153, 153, 153, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                153, 153, 153, 153, 153, 153, 153, 153, 153, 115, 115, 115, 115, 115, 115, 115, 115, 115, 153, 153, 153, 115, 115, 115, 115, 115, 115, 115, 115, 115,
                153, 153, 153, 153, 153, 153, 153, 153, 153, 44, 44, 44, 44, 44, 44, 44, 44, 44, 153, 153, 153, 44, 44, 44, 44, 44, 44, 44, 44, 44]
        },
        "02" : {
            "id" : "02",
            "columns" : 30,
            "rows" : 20,

            "doors" : [
                {
                    "tile_x" : 30,
                    "tile_y" : 14,
                    "width"  : 32,
                    "height" : 128,
                    "destination_room" : "01",
                    "destination_tile_x" : 0,
                    "destination_tile_y" : 1
                }
            ],
            "coins" : [
                [2, 1],
                [2, 5],
                [27, 2],
                [1, 14],
                [1, 17],
                [14, 0],
                [9, 13]
            ],
            "flies" : [],
            "slimes" : [],
        
            "map" : [153, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 153, 153,
                153, 133, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 153, 153,
                153, 133, 133, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 153, 153,
                153, 104, 104, 104, 104, 104, 105, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 129, 104, 153, 153,
                153, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 69, 57, 45, 0, 0, 0, 0, 0, 0, 0, 0, 153, 153,
                153, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 153, 153,
                153, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 129, 104, 104, 104, 104, 153, 153,
                153, 0, 0, 0, 0, 0, 0, 0, 69, 57, 45, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 153, 153, 153, 153, 153, 153,
                153, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 81, 0, 0, 0, 0, 0, 0, 0, 0, 0, 153, 153, 153, 153, 153,
                153, 104, 104, 104, 104, 104, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 153, 153, 153, 153,
                153, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 81, 0, 0, 0, 0, 0, 0, 0, 153, 153, 153, 153,
                153, 0, 0, 0, 0, 0, 0, 0, 0, 104, 104, 104, 104, 104, 104, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 153, 153, 153,
                153, 0, 0, 0, 0, 0, 0, 0, 104, 153, 153, 153, 153, 153, 153, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 153, 153,
                153, 0, 0, 0, 133, 0, 0, 104, 153, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 145, 133, 0, 0, 0, 0, 0, 0, 0, 153,
                153, 0, 0, 133, 133, 0, 104, 153, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 117, 104, 104, 104, 93, 0, 0, 0, 0, 0, 0,
                153, 104, 104, 104, 104, 104, 153, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                153, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                153, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 129, 104, 105, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                153, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 129, 104, 104, 104, 104,
                153, 104, 104, 104, 104, 104, 104, 104, 104, 115, 115, 69, 45, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 153, 153, 153, 153]
        },
        "03" : {
            "id" : "03",
            "columns" : 30,
            "rows" : 20,

            "doors" : [
                {
                    "tile_x" : -1,
                    "tile_y" : 0,
                    "width"  : 32,
                    "height" : 960,
                    "destination_room" : "01",
                    "destination_tile_x" : 29,
                    "destination_tile_y" : -69
                }
            ],
            "coins" : [
                [13, 1],
                [10, 1],
                [23, 13],
                [16, 9],
                [18, 14],
                [3, 8],
                [28, 3]
            ],
            "flies" : [],
            "slimes" : [],
        
            "map" : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 81, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 81, 0, 0, 0, 0, 0, 81, 0, 0, 0,
                0, 0, 0, 0, 81, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 81, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 81, 0, 0, 0, 0, 0, 0,
                53, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 81, 0,
                104, 93, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 81, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                153, 0, 0, 0, 0, 0, 81, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 81, 0, 0, 0,
                0, 0, 0, 81, 0, 0, 0, 0, 0, 0, 0, 81, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 81, 0,
                53, 0, 0, 0, 0, 0, 0, 0, 0, 81, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                104, 104, 104, 105, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 69, 45, 0, 0, 0, 81, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                153, 153, 153, 0, 0, 0, 0, 81, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 81, 0, 0, 0,
                153, 153, 153, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                153, 153, 0, 0, 0, 81, 0, 0, 0, 0, 0, 0, 81, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                153, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 81, 0, 0, 0, 81, 0, 0, 81, 0, 0, 0, 0,
                103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103, 103,
                44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44]
        }                
    },
    "medium" : {
        "backgroundImage" : "background_medium.png",
        "01": {
            "id" : "01",
            "columns" : 30,
            "rows" : 20,

            "doors" : [
                {
                    "tile_x" : 3,
                    "tile_y" : -1,
                    "width"  : 768,
                    "height" : 32,
                    "destination_room" : "02",
                    "destination_tile_x" : -69,
                    "destination_tile_y" : 19
                }
            ],
            "coins" : [],
            "flies" : [
                {
                    "start_x" : 320,
                    "start_y" : 128,
                    "end_x" : 576,
                    "end_y" : 128
                }
            ],
            "slimes" : [
                {
                    "start_x" : 96,
                    "start_y" : 480,
                    "end_x" : 224,
                    "end_y" : 480
                },
                {
                    "start_x" : 672,
                    "start_y" : 480,
                    "end_x" : 800,
                    "end_y" : 480
                }
            ],
        
            "map" : [155, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 155,
                155, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 155,
                155, 0, 0, 0, 0, 0, 0, 0, 0, 100, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 76, 0, 0, 0, 0, 0, 0, 0, 0, 155,
                155, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 155,
                155, 0, 0, 0, 125, 125, 125, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 125, 125, 125, 0, 0, 0, 155,
                155, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 155,
                155, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 155,
                155, 0, 112, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 88, 88, 76, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 112, 0, 155,
                155, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 155,
                155, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 112, 0, 0, 0, 0, 112, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 155,
                155, 0, 0, 0, 0, 112, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 112, 0, 0, 0, 0, 155,
                155, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 155,
                155, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 135, 135, 135, 135, 135, 135, 136, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 155,
                155, 100, 88, 76, 0, 0, 0, 0, 0, 0, 0, 0, 0, 155, 155, 155, 155, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 88, 76, 155,
                155, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 155, 155, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 155,
                155, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 155,
                155, 0, 0, 148, 135, 135, 135, 135, 124, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 148, 135, 135, 135, 135, 124, 0, 0, 155,
                155, 0, 0, 0, 0, 0, 0, 0, 0, 0, 112, 0, 0, 0, 0, 0, 0, 0, 0, 112, 0, 0, 0, 0, 0, 0, 0, 0, 0, 155,
                155, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 155,
                155, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 135, 135, 135, 135, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 155]
        },
        "02": {
            "id" : "02",
            "columns" : 30,
            "rows" : 20,

            "doors" : [
                {
                    "tile_x" : 3,
                    "tile_y" : 20,
                    "width"  : 768,
                    "height" : 32,
                    "destination_room" : "01",
                    "destination_tile_x" : -69,
                    "destination_tile_y" : 0
                },
                {
                    "tile_x" : -1,
                    "tile_y" : 0,
                    "width" : 32,
                    "height" : 64,
                    "destination_room" : "03",
                    "destination_tile_x" : 29,
                    "destination_tile_y" : -69
                },
                {
                    "tile_x" : 30,
                    "tile_y" : 0,
                    "width" : 32,
                    "height" : 64,
                    "destination_room" : "04",
                    "destination_tile_x" : 0,
                    "destination_tile_y" : -69
                }
            ],
            "coins" : [],
            "flies" : [],
            "slimes" : [],
        
            "map" : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 53, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 41, 0,
                135, 135, 135, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 135, 135, 135,
                155, 155, 155, 135, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 135, 155, 155, 155,
                155, 155, 155, 155, 135, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 135, 155, 155, 155, 155,
                155, 155, 155, 155, 155, 135, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 135, 155, 155, 155, 155, 155,
                155, 155, 155, 155, 155, 155, 135, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 135, 155, 155, 155, 155, 155, 155,
                155, 155, 155, 155, 155, 155, 155, 135, 0, 0, 112, 0, 0, 0, 0, 0, 0, 0, 0, 112, 0, 0, 135, 155, 155, 155, 155, 155, 155, 155,
                155, 155, 155, 155, 155, 155, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 155, 155, 155, 155, 155, 155,
                155, 155, 155, 155, 155, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 155, 155, 155, 155, 155,
                155, 155, 155, 0, 0, 0, 0, 0, 0, 0, 0, 112, 0, 0, 0, 0, 0, 0, 112, 0, 0, 0, 0, 0, 0, 0, 0, 155, 155, 155,
                155, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 155,
                155, 0, 0, 0, 0, 0, 0, 0, 112, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 112, 0, 0, 0, 0, 0, 0, 155,
                155, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 112, 0, 0, 112, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 155,
                155, 0, 0, 0, 0, 112, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 112, 0, 0, 0, 0, 155,
                155, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 155,
                155, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 112, 0, 0, 0, 0, 0, 0, 112, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 155,
                155, 135, 135, 135, 124, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 148, 135, 135, 135, 155,
                155, 155, 155, 155, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 155, 155, 155, 155,
                155, 155, 155, 0, 0, 0, 100, 88, 88, 76, 0, 0, 0, 0, 100, 76, 0, 0, 0, 0, 100, 88, 88, 76, 0, 0, 0, 155, 155, 155]
        },
        "03": {
            "id" : "03",
            "columns" : 30,
            "rows" : 20,

            "doors" : [
                {
                    "tile_x" : 30,
                    "tile_y" : 0,
                    "width"  : 32,
                    "height" : 64,
                    "destination_room" : "02",
                    "destination_tile_x" : 0,
                    "destination_tile_y" : -69
                }
            ],
            "coins" : [],
            "flies" : [],
            "slimes" : [],
        
            "map" : [155, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                155, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 41, 0,
                155, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 135, 135, 135, 135, 135,
                155, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 155, 155, 155, 155, 155,
                155, 0, 0, 0, 5, 135, 135, 135, 135, 135, 135, 135, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 0, 0, 0, 155,
                155, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 155,
                155, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 155,
                155, 133, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 155,
                155, 133, 133, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 155,
                155, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 136, 0, 0, 0, 155,
                155, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 155,
                155, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 148, 155,
                155, 88, 76, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 133, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 155,
                155, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 133, 145, 133, 0, 0, 0, 0, 0, 0, 0, 0, 0, 155,
                155, 0, 0, 0, 0, 0, 5, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 155,
                155, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 155,
                155, 135, 135, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 155,
                155, 155, 155, 135, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 155,
                155, 155, 155, 155, 135, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 155,
                155, 155, 155, 155, 155, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 135, 155]
        },
        "04": {
            "id" : "04",
            "columns" : 30,
            "rows" : 20,

            "doors" : [
                {
                    "tile_x" : -1,
                    "tile_y" : 0,
                    "width"  : 32,
                    "height" : 64,
                    "destination_room" : "02",
                    "destination_tile_x" : 29,
                    "destination_tile_y" : -69
                }
            ],
            "coins" : [],
            "flies" : [],
            "slimes" : [],
        
            "map" : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 155,
                0, 53, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 155,
                135, 135, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 112, 0, 0, 0, 112, 0, 0, 0, 0, 0, 0, 0, 0, 155,
                155, 155, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 155,
                155, 155, 0, 0, 135, 135, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 155,
                155, 155, 0, 0, 155, 155, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 112, 0, 0, 0, 0, 0, 0, 155,
                155, 155, 0, 0, 155, 155, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 155,
                155, 155, 0, 0, 155, 155, 135, 135, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 135, 0, 0, 0, 155,
                155, 155, 0, 0, 155, 155, 155, 155, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 155, 0, 0, 0, 155,
                155, 155, 0, 0, 155, 155, 155, 155, 0, 0, 135, 135, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 155, 0, 0, 148, 155,
                155, 155, 0, 0, 155, 155, 155, 0, 0, 0, 155, 155, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 135, 155, 0, 0, 0, 155,
                155, 155, 0, 0, 155, 155, 0, 0, 0, 0, 155, 155, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 155, 155, 0, 0, 0, 155,
                155, 155, 0, 0, 155, 0, 0, 0, 0, 0, 155, 155, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 155, 155, 0, 0, 0, 155,
                155, 155, 0, 0, 155, 0, 0, 0, 0, 5, 155, 155, 0, 0, 135, 0, 0, 0, 135, 0, 0, 0, 135, 0, 155, 155, 124, 0, 0, 155,
                155, 155, 0, 0, 155, 155, 0, 0, 0, 0, 155, 155, 0, 0, 155, 0, 0, 0, 155, 0, 0, 0, 155, 0, 155, 155, 0, 0, 0, 155,
                155, 155, 0, 0, 155, 155, 155, 0, 0, 0, 155, 155, 0, 0, 155, 0, 0, 100, 155, 76, 0, 0, 155, 0, 155, 155, 0, 0, 0, 155,
                155, 155, 0, 0, 155, 155, 155, 155, 0, 0, 155, 155, 0, 0, 155, 0, 0, 0, 155, 0, 0, 0, 155, 0, 155, 155, 0, 0, 0, 155,
                155, 155, 0, 0, 155, 155, 155, 155, 0, 0, 155, 155, 0, 0, 155, 0, 0, 0, 155, 0, 0, 0, 155, 0, 155, 155, 0, 0, 148, 155,
                155, 155, 0, 0, 155, 155, 155, 155, 0, 0, 155, 155, 0, 0, 155, 125, 125, 125, 155, 0, 0, 100, 155, 0, 155, 155, 0, 0, 0, 155,
                155, 155, 44, 44, 155, 155, 155, 155, 44, 44, 155, 155, 44, 44, 155, 44, 44, 44, 155, 44, 44, 44, 155, 44, 155, 155, 44, 44, 44, 155]
        }
    },
    "hard" : {}
}