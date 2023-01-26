import React from 'react';
import Section from './section'

const AdComponent = (props) => {
        return(
         <div>
         {(props.showSection) ?

            <Section title={'Get online care'}>
            <div style={{display: 'flex', flexDirection: 'row', padding: '20px', flexWrap: 'wrap', gap: '15px',}}>
               <Ad 
                  header={'Find affordable prescriptions'} 
                  data={"Don't break the bank on medications. Explore affordable options with Cuverd."} 
                  image={'https://cdn.shopify.com/s/files/1/0569/4285/4214/t/15/assets/Updated_Cuvered_logo.png?v=1667951504'}
                  linkTitle={'View prescription options'}
                  link={'https://behealthyr.com/pages/cuverd'}
               />
               <Ad 
                  header={'Get an online visit'} 
                  data={"Share your results with a doctor today with convenient online visits from Sesame Care."} 
                  image={"https://cdn.shopify.com/s/files/1/0569/4285/4214/t/15/assets/Sesame.Purple%20(1).png?v=1663214941"}
                  linkTitle={'Find a doctor'}
                  link={'https://sesamecare.com/partners/healthyr?utm_source=account_dashboard'}
               />
               <Ad 
                  header={'Prescriptions at your doorstep'} 
                  data={"We deliver affordable, high-quality, FDA approved medications directly to your doorstep."} 
                  image={"https://cdn.shopify.com/s/files/1/0569/4285/4214/t/15/assets/Healthyr%20Rx%20No%20Icon.png?v=1663660578"}
                  linkTitle={'View prescription options'}
                  link={'https://healthyr.manifestrx.com/'}
               />
            </div>
         </Section>

            :

            <div style={{display: 'flex', flexDirection: 'row', padding: '20px', flexWrap: 'wrap', gap: '15px',}}>
               <Ad 
                  header={'Find affordable prescriptions'} 
                  data={"Don't break the bank on medications. Explore affordable options with Cuverd."} 
                  image={'https://cdn.shopify.com/s/files/1/0569/4285/4214/t/15/assets/Updated_Cuvered_logo.png?v=1667951504'}
                  linkTitle={'View prescription options'}
                  link={'https://behealthyr.com/pages/cuverd'}
               />
               <Ad 
                  header={'Get an online visit'} 
                  data={"Share your results with a doctor today with convenient online visits from Sesame Care."} 
                  image={"https://cdn.shopify.com/s/files/1/0569/4285/4214/t/15/assets/Sesame.Purple%20(1).png?v=1663214941"}
                  linkTitle={'Find a doctor'}
                  link={'https://sesamecare.com/partners/healthyr?utm_source=account_dashboard'}
               />
               <Ad 
                  header={'Prescriptions at your doorstep'} 
                  data={"We deliver affordable, high-quality, FDA approved medications directly to your doorstep."} 
                  image={"https://cdn.shopify.com/s/files/1/0569/4285/4214/t/15/assets/Healthyr%20Rx%20No%20Icon.png?v=1663660578"}
                  linkTitle={'View prescription options'}
                  link={'https://healthyr.manifestrx.com/'}
               />
            </div>
         }
      </div>
      )
}

const Ad = (props =>{
   return(
      <div style={STYLES.adContainer}>
         <img src={props.image} alt={props.alt} style={{maxHeight: '32.25px', height: '100%', width: '100%', flex: '1', objectFit: 'contain', objectPosition: 'left'}}/>
         <div style={STYLES.adTitle}>
            {props.header}
         </div>
         <div>
            {props.data}
         </div>
         <div style={STYLES.adLink}  onClick={() => window.open(props.link)}>
            {props.linkTitle}
            <svg viewBox="0 0 14 10" fill="none" aria-hidden="true"
                focusable="false" role="presentation" class="icon icon-arrow"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z"
                    fill="currentColor">
                </path>
            </svg>
         </div>
      </div>
   )
})

export default AdComponent;


const STYLES = {
    container: {
        background: 'white',
        padding: '20px',
        boxShadow: '2px 2px 5px #e7e4e9'
    },
    adContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      marginBottom: '10px',
      flex: '1',
      minWidth: '300px',
   },
   adTitle: {
      fontWeight: '700',
      fontSize: '18px',
      marginRight: '10px',
   },
   adLink: {
      textDecoration: 'underline',
      cursor: 'pointer',
      marginTop: 'auto'
   },
}
