class Util {

    static converteData_ddMMyyyy_para_yyyyMMdd(data: string): string {
        let dataF = data.substring(6) + '-' +
				    data.substring(3,5) + '-' +
					data.substring(0,2);
        console.log(dataF);
        return dataF;
    }

    static converteData_yyyyMMdd_para_ddMMyyyy(data: string): string {
        let dataF = data.substring(8) + '/' +
				    data.substring(5,7) + '/' +
					data.substring(0,4);
        console.log(dataF);
        return dataF;
    }

}