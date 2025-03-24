export const API_KEY = "AIzaSyCgg4_GgCute82Oia9JMlsT72WU8MXpSX4";

export const value_converter = (value) => {
    if(value>=1000000)
    {
       return Math.floor(value/1000000)+"M";

    }
    else if(value>=1000)
    {
        return Math.floor(value/1000)+"k";
    }
    else{
        return value;
    }
}

