export const typeOfData = [
    {
        name: 'small',
        title: 'Мало данных',
        url: 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D'
    },
    {
        name: 'big',
        title: 'Много данных',
        url: 'http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D'
    }
]



export const dataDesc = [
    {
        id: 1,
        name: 'id',
        placeholder: 'Номер',      
        showInTable: true,
        showInForm: true,
        parent: 0
    },
    {
        id: 2,
        name: 'firstName',
        placeholder: 'Имя',  
        showInTable: true,
        showInForm: true,
        parent: 0
    },
    {
        id: 3,
        name: 'lastName',
        placeholder: 'Фамилия',  
        showInTable: true,
        showInForm: true,
        parent: 0
    },
    {
        id: 4,
        name: 'email',
        placeholder: 'email',  
        showInTable: true,
        showInForm: true,
        parent: 0
    },
    {
        id: 5,
        name: 'phone',
        placeholder: 'Телефон',  
        showInTable: true,
        showInForm: true,
        parent: 0
    },
    {
        id: 6,
        name: 'address',
        placeholder: 'Адрес',  
        showInTable: false,
        showInForm: false,
        parent: 0
    },
    {
        id: 7,
        name: 'streetAddress',
        placeholder: 'Улица',  
        showInTable: false,
        showInForm: true,
        parent: 6
    },
    {
        id: 8,
        name: 'city',
        placeholder: 'Город',  
        showInTable: false,
        showInForm: true,
        parent: 6
    },
    {
        id: 9,
        name: 'state',
        placeholder: 'Штат',  
        showInTable: false,
        showInForm: true,
        parent: 6
    },
    {
        id: 10,
        name: 'zip',
        placeholder: 'Индекс',  
        showInTable: false,
        showInForm: true,
        parent: 6
    },
    {
        id: 11,
        name: 'description',
        placeholder: 'Описание',  
        showInTable: false,
        showInForm: true,
        parent: 0
    }
]

export const dataForTable = dataDesc.filter(item => item.showInTable).map(data => data.name)
// export const dataForTable = ['id', 'firstName', 'lastName', 'email', 'phone']