// TODO: text color
// TODO: logo color

module.exports = (
  title,
  text,
  image,
  colors = {},
) => {

  const setColors = Object.assign({}, {
    logo: '#fff',
    title: '#fff',
    text: '#ccc',
    background: '#fff',
  }, colors)

  return (
`<svg width="1600" height="840" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <style>
    #TitleText {
        color: ${setColors.title || '#fff'};
        font-family: sans-serif;
        font-size: 80px;
        line-height: 104px;
        font-weight: bold;
        margin: 0;
    }
    #MetaText {
        color: ${setColors.text};
        font-family: sans-serif;
        font-size: 38px;
        line-height: 49px;
        font-weight: lighter;
        margin: 0;
        margin-top: 38px;
        font-style: italic;
    }
    #canvas_background {
      fill: ${setColors.background};
    }
    #hero {
      fill-opacity: 1;
      stroke-opacity: 0;
      stroke-width: 0;
      stroke: #fff;
      fill: ${image ? 'url(#bgImage)' : '#030303' };
      filter: ${image ? 'url(#background)' : 'none' };
    }
    .logo {
      fill: ${setColors.logo};
      stroke: ${setColors.logo};
      stroke-opacity: 0;
    }

  </style>
  <defs>
${ (image && `
      <pattern
        id="bgImage"
        patternUnits="userSpaceOnUse"
        width="${image.width || '100%'}"
        height="${image.height || '1600'}"
      >
        <image
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xlink:href="${image.url.replace(/&/gi, '&amp;')}"
          x="${image.x || '0'}"
          y="${(image.y - 440) || '-440'}"
          width="${image.width || '100%'}"
          height="${image.height || '1600'}"
        />
      </pattern>
      <linearGradient id="darkenBackground"
        x1="0%" y1="0%"
        x2="0%" y2="100%"
        spreadMethod="pad"
        gradientTransform="rotate(-35)"
        mode="multiply"
      >
        <stop offset="0%"  stop-color="#000" stop-opacity="0.7"/>
        <stop offset="70%" stop-color="#000" stop-opacity="0"/>
      </linearGradient>
      <filter id="background" x="0%" y="0%" width="100%" height="100%">
        <feComposite in="darkenBackground" in2="SourceGraphic" operator="in"/>
      </filter>
`) || '' }
  </defs>
  <g>
    <rect id="canvas_background" height="840" width="1600" y="-1" x="-1"/>
  </g>
  <g>
    <path id="hero" d="M1-1V768l1599.7-116.1l-0.3-651.5L1-1z" />
    <g stroke="null">
      <g stroke="null" transform="matrix(0.42839717683474104,0,0,0.42839717683474104,-36.53697037030645,-531.3154002437344)" >
        <path class="logo" d="M3452.6,2191.9c66.3-77.7,106.6-178.2,106.6-288.6c0-88.3-25.7-170.8-70.3-239.8 c8.8,21.5,13.3,45.9,13.3,73.2c0,28.6-2.4,63.1-7.4,102.9L3452.6,2191.9L3452.6,2191.9z" />
        <path class="logo" d="M2968,2022.7l56.2-457.5h135l-6.1,53.3c53.6-35.5,107.7-53.3,162.6-53.3 c50.9,0,92.6,12.5,125.5,37.1c-81.2-87.8-197.1-142.7-326-142.7c-245.3,0-444,198.7-444,444c0,41.6,5.8,82,16.4,120.2 L2968,2022.7L2968,2022.7z" />
        <path class="logo" d="M3361.6,1805.2c1.6-12.5,2.7-23.9,3.4-33.4c0.5-9.8,0.8-18.6,0.8-26.3c0-52-28.1-78-84.6-78 c-34.7,0-64.7,10.6-89.4,31.6c-20.4,16.7-35.5,36.9-45.4,61c-5.3,12.2-9.8,27.1-13.5,44.8c-3.7,17.8-6.9,38.2-9.8,61.3 l-34.2,276.6h-135.5h-212.2c78.8,123.1,217,204.8,374,204.8c67.1,0,131-14.9,188.1-41.6L3361.6,1805.2L3361.6,1805.2z" />
      </g>
    </g>
    <foreignObject xmlns="http://www.w3.org/2000/svg" x="60" y="80" width="980" height="600">
      <p xmlns="http://www.w3.org/1999/xhtml" id="TitleText">${title}</p>
      <p xmlns="http://www.w3.org/1999/xhtml" id="MetaText">${text}</p>
    </foreignObject>
  </g>
</svg>`)}
