import AsyncStorage from "@react-native-async-storage/async-storage";

export class StorageAdapter {

  static async getItem(key: string): Promise<string | null>{
    try{
      return await AsyncStorage.getItem(key);
    }catch(e){
      return null;
    };
  };

  static async setItem(key: string, value: string): Promise<void>{
    try{
      await AsyncStorage.setItem(key,value);
    }catch(e){
      throw new Error(`Error setting key: ${key}`);
    };
  };

  static async removeItem(key: string): Promise<void>{
    try{
      await AsyncStorage.removeItem(key);
    }catch(e){
      console.log(e);
      throw new Error(`Something get wrong: ${e}`)
    }
  }

};