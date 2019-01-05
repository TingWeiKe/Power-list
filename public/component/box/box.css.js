export const style = {
    col: {
        margin: '30px  20px ',
        maxWidth: '280px',
        minWidth: '270px'
    },
    playlistBox: {
        border: '1.5px solid #666'
    },
    img: {
        width: '100%', maxWidth: '100%',
        borderBottom: '2px solid #666'
    },
    description: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        display:'-webkit-box',
        '-webkit-box-orient': 'vertical',
        '-webkit-line-clamp': '3',
        
    },
    updated: {
        verticalAlign:'bottom'
    },
    a:{
        textDecoration:'none',
        color:'black',
        ':hover': {
            backgroundColor: 'red'
          },
      
          ':focus': {
            backgroundColor: 'green'
          },
      
          ':active': {
            backgroundColor: 'yellow'
          }
    },
    text:{
        maxHeight:'260px',
        minHeight:'260px',
        margin:'0 10px'
    },
    owner:{
        textDecoration:'underline',
    }
}
