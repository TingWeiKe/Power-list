import React, { PureComponent } from 'react'
import { Grid, Image, Segment, } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
export default class recents extends PureComponent {
    render() {
        let x = [0,1,2,3,4,5]
        return (
            <div className="header">
                <h1>最近播放</h1>
                <Grid columns={4} doubling={true} stackable>
                {x.map(n=>{return <Grid.Column>
                         <div className='feature_content'>
                             <Link to=''>
                                 <Segment className='feature_box'>
                                     <Image className='category_img' src="https://www.iconsdb.com/icons/preview/color/4183C4/play-3-xl.png"></Image>
                                     <div className='title_box'>
                                         <h3 className="category_title">華語速爆新歌 (每週二五更新)</h3>
                                     </div>
                                 </Segment>
                             </Link>
                         </div>
                     </Grid.Column>
               
                })}
                 </Grid>
            </div>
        )
    }
}
