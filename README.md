### INFO-3173  
**Lab 7 – My Favourite Moment App**  

---

#### Description:  
In this lab, you will demonstrate your ability to create a React Native app using Expo to build an app that allows the user to relive their favorite moment through a picture and a quote that is persisted on their phone. The app is built to run on Android (or iOS if using a Mac). It utilizes the Expo Image Picker (Camera), File System, and SQLite API.  

---

### Requirements:

| **Feature**                                                                                                           | **Complete (Y/N)** | **Marks Awarded** |
|-----------------------------------------------------------------------------------------------------------------------|---------------------|-------------------|
| The app's main screen should display:                                                                                 |                     |                   |
| - A section for an image (with a placeholder).                                                                        |                     | 1                 |
| - A Text Input for a quote.                                                                                           |                     |                   |
| - A Button to Save the data.                                                                                          |                     |                   |
| The image area can be pressed and will bring up the option to take a new picture or select an existing one.           |                     | 2                 |
| After the picture is taken, it should be displayed instead of the placeholder image.                                  |                     |                   |
| When the Save Button (#3) is pressed, the profile picture should be moved/copied from temp device storage to permanent storage in the documentDirectory. |                     | 4                 |
| When the Save Button (#3) is pressed, the content from the text input field (#2) and URI for the permanent location of the profile picture should be saved to the SQLite Database. |                     | 4                 |
| Once the Contact Info is saved, the text of the Save button (#3) should not appear on the screen.                     |                     | 1                 |
| When the app loads, it should check if data already exists. If data does exist, it should load into the app, including: |                     |                   |
| - Profile Picture (#1).                                                                                               |                     | 2                 |
| - Text Input Field (#2).                                                                                              |                     |                   |
| - Save Button should be hidden (#3).                                                                                  |                     |                   |
| The following guidelines are followed:                                                                                |                     |                   |
| - App is original and styled.                                                                                         |                     |                   |
| - App is able to compile and run on an Android device using `expo start`.                                             |                     |                   |
| - App title on the main screen contains the lab name and FOL username.                                                |                     |                   |
| - No errors are generated when running the application.                                                               |                     |                   |
| - PowerPoint with screenshots matching wireframes is submitted.                                                       |                     |                   |

**Total Marks: ___ / 14**  

---

### Wireframes:  

[Add visual wireframes as indicated in the original document]  

---

### Hints:
- The Profile Picture area could be wrapped in `TouchableOpacity` to allow for the default image to launch the Image Picker.  
- To move the image from temp storage to permanent storage, you will likely need to use `FileSystem.moveAsync()` ([Documentation](https://docs.expo.dev/versions/latest/sdk/filesystem/#filesystemmoveasyncoptions)).  
- Consider adding a helper button to DROP your SQLite data and clear the `documentDirectory` for your app during testing and development.  

---

### Submission:  
Submit the following:  
1. A zipped React Native Project (`.zip` format only).  
2. A PowerPoint containing screenshots matching wireframes to demonstrate the functionality outlined in the rubric, including:  
   - Default application state with no input.  
   - Saved state with a picture, text, and hidden SAVE button.  
   - Code snippet screenshots for unobservable functionality, such as:  
     - Saving the photo to the `documentDirectory`.  
     - SQLite logic for SAVE operation.  
     - Loading logic for checking existing data and preloading it into the app.  

**Submit both deliverables to the Lab 7 Dropbox before the deadline.**
