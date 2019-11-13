module.exports = (title, subtitle, image = {
  url: 'https://images.unsplash.com/photo-1573567001730-9eb49e901f40?fit=crop&amp;w=600&amp;q=80',
  x: 0,
  y: -85,
  width: '100%',
  height: 757
}) => (
`<svg width="600" height="300" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <style>
    #TitleText {
        color: #fff; font-family: sans-serif; font-size: 35px; line-height: 48px; font-weight: bold; margin: 0;
    }
    #MetaText {
        color: #ccc;
        font-family: sans-serif;
        font-size: 16px; line-height: 38px; font-weight: lighter; margin: 0; font-style: italic;
    }
  </style>
  <defs>
${ image && `
<pattern
  id="background"
  patternUnits="userSpaceOnUse"
  width="${image.width || '100%'}"
  height="${image.height || '600'}"
>
      <image
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xlink:href="${image.url.replace(/&/gi, '&amp;')}"
        x="${image.x || '0'}"
        y="${image.y || '0'}"
        width="${image.width || '100%'}"
        height="${image.height || '600'}"
      />
    </pattern>
`}
  </defs>
  <g>
    <rect fill="#fff" id="canvas_background" height="302" width="602" y="-1" x="-1"/>
  </g>
  <g>
    <path id="svg_12" d="m-2,-3.5l0,291.5l605,-44l-2,-247l-603,-0.5z" fill-opacity="1" stroke-opacity="null" stroke-width="0" stroke="#fff"   fill="url(#background)" />
    <g stroke="null" id="svg_9">
      <g stroke="null" transform="matrix(0.42839717683474104,0,0,0.42839717683474104,-36.53697037030645,-531.3154002437344) " id="svg_5">
        <path stroke="#000" fill="#fff" id="svg_6" d="m1349.283033,1591.705491c25,-29.3 40.2,-67.2 40.2,-108.8c0,-33.3 -9.7,-64.4 -26.5,-90.4c3.3,8.1 5,17.3 5,27.6c0,10.8 -0.9,23.8 -2.8,38.8l-15.9,132.8z"/>
        <path stroke="#000" fill="#fff" id="svg_7" d="m1166.583033,1527.905491l21.2,-172.5l50.9,0l-2.3,20.1c20.2,-13.4 40.6,-20.1 61.3,-20.1c19.2,0 34.9,4.7 47.3,14c-30.6,-33.1 -74.3,-53.8 -122.9,-53.8c-92.5,0 -167.4,74.9 -167.4,167.4c0,15.7 2.2,30.9 6.2,45.3l105.7,-0.4z"/>
        <path stroke="#000" fill="#fff" id="svg_8" d="m1314.983033,1445.905491c0.6,-4.7 1,-9 1.3,-12.6c0.2,-3.7 0.3,-7 0.3,-9.9c0,-19.6 -10.6,-29.4 -31.9,-29.4c-13.1,0 -24.4,4 -33.7,11.9c-7.7,6.3 -13.4,13.9 -17.1,23c-2,4.6 -3.7,10.2 -5.1,16.9c-1.4,6.7 -2.6,14.4 -3.7,23.1l-12.9,104.3l-51.1,0l-80,0c29.7,46.4 81.8,77.2 141,77.2c25.3,0 49.4,-5.6 70.9,-15.7l22,-188.8z"/>
      </g>
    </g>
    <foreignObject xmlns="http://www.w3.org/2000/svg" x="30" y="40" width="350" height="200">
      <p xmlns="http://www.w3.org/1999/xhtml" id="TitleText">${title}</p>
      <p xmlns="http://www.w3.org/1999/xhtml" id="MetaText">${subtitle}</p>
    </foreignObject>
  </g>
</svg>`)
