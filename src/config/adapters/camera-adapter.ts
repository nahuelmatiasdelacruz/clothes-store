import { launchCamera, launchImageLibrary } from "react-native-image-picker";

export class CameraAdapter {
  static async takePicture(): Promise<string[]>{
    try{
      const response = await launchCamera({
        mediaType: 'photo',
        cameraType: 'back',
        quality: 0.7
      });
      if(response.assets && response.assets[0].uri){
        return [response.assets[0].uri];
      };
    }catch(e){
      console.log({e});
      return [];
    };
    return [];
  }

  static async getPicturesFromLibrary(): Promise<string[]> {
    try{
      const response = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.7,
        selectionLimit: 10
      });
      if(response.assets && response.assets.length > 0){
        return response.assets.map(asset => asset.uri!);
      }
    }catch(e){
      console.log(e);
      return [];
    }
    return [];
  }
}