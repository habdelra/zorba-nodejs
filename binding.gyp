{
  "targets":
  [{
      "target_name": "zorba",
      "sources": [
        "./src/NativeExtension.cc",
        "./src/functions.cc"
      ],
      "include_dirs": [
        "./include",
        "<!(node -e \"require('nan')\")"
      ],
      "conditions": [
          [
          'OS=="win"',
            {
              "link_settings": {
                "libraries": [
                  "../win/lib/zorba_simplestore.lib"
                ]
              },
              "include_dirs": [
                "win/include"
              ]
            }
          ], [
          'OS=="mac"',
            {
              'xcode_settings':
              {
                'GCC_ENABLE_CPP_EXCEPTIONS': 'YES'
              },
              "include_dirs": [
                "/usr/include",
                "/opt/local/include",
                "/usr/local/include"
              ],
              "link_settings": {
                "libraries": [
                  "/opt/local/lib/libzorba_simplestore.dylib",
                ]
              }
            }
          ], [
          'OS=="linux"',
            {
              'xcode_settings':
              {
                'GCC_ENABLE_CPP_EXCEPTIONS': 'YES'
              },
              "include_dirs": [
                "/usr/include",
                "/opt/local/include",
                "/usr/local/include"
              ],
              "link_settings": {
                "libraries": [
                  "-lzorba_simplestore"
                ]
              }
            }
          ]
      ]
  }]
}
