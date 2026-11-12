const myAssets=[
    {
        id:1,
        serial_number:'123',
        asset_name:'Macbook air 15',
        asset_type:'Laptop',
        date_assigned:'12-06-26',
        repair: null
    },
    {
        id:2,
        serial_number:'456',
        asset_name:'Hp Spectre',
        asset_type:'Laptop',
        date_assigned:'12-06-26',
       repair: {
            status: 'working',
            issue:'Display flickering'
            
        }
    },
    {
        id:3,
        serial_number:'789',
        asset_name:'Benq 21',
        asset_type:'Monitor',
        date_assigned:'12-06-26',
        repair:null
    }

]

export default myAssets