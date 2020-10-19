import React from 'react'
import { PDFViewer } from '@react-pdf/renderer';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer'
import { withRouter } from 'react-router';
import * as moment from 'moment'
 // Create styles
 const styles = StyleSheet.create({
    page: {
        flexDirection: 'columns',
        backgroundColor: '#fff',
        padding: 10,
    },
     
}); 
// Create Document Component
const GeneratePdf = (props) => {
    const { location } = props
    const {state} = location
    return (
       
            state && state.item && 
        
        <div className="" style={{width:'100vw'}}>
            <PDFViewer style={{width:'100vw',height:'100vh'}}>
                <Document>
                <Page wrap size="A4" style={styles.page} width="100vw">
                    <View style={styles.section}>
                        <Text>Task name: {state.item.name}</Text>
                    </View>
                    <View break style={styles.section}>
                        <Text break>Task Status: {state.item.isComplete === 0 ? 'Pending' : 'Completed'}</Text>
                    </View>
                    <View break style={styles.section}>
                        <Text break>Task description: {state.item.description}</Text>
                    </View>
                    <View break style={styles.section}>
                        <Text break>Task due date:  {moment(state.item.dueDate).format('YYYY-MM-DD')}</Text>
                    </View>
                    <View break style={styles.section}>
                        <Text break>Task priority:  {state.item.priority}</Text>
                    </View>
                    {/* <View break style={styles.section}> */}
                        {
                            state.item.files && state.item.files.length>0 &&
                            state.item.files.map((t,i)=> 
                                <Image src={`http://localhost:3000/api/containers/container/download/${t.name}`} key={i} alt={t.name}  />
                            )
                        }
                        
                    {/* </View> */}
                </Page>
                </Document>
            </PDFViewer>
        </div>
    )
};

export default withRouter(GeneratePdf)