import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  header: {
    marginTop: 23,
    backgroundColor: '#ba87f5',
    flexDirection: 'row',
  },
  footer: {
    backgroundColor: '#ba87f5',
    flexDirection: 'row',
  },
  title: {
    color: '#ffffff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  gameboard: {
    flex: 1,
    backgroundColor: '#430081',
    alignItems: 'center',
    justifyContent: 'center'
  },
  throws: {
    textAlign: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 16,
    marginTop: 5,
    fontWeight: 'bold'
  },
  gameinfo: {
    textAlign: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 19,
    marginTop: 5,
    fontWeight: 'bold',
    color: "white"
  },
  inputbox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 25,
    backgroundColor: '#ede6ff',
    width: 350,
    height: 220,
    paddingTop: 20,
    borderRadius: 10
  },
  input: {
    fontSize: 20,
    width: 250,
    height: 50,
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'white'
  },
  rules: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50
  },
  rule: {
    marginHorizontal: 30,
    marginVertical: 15,
    fontSize: 18
  },
  example: {
    marginHorizontal: 70,
    textAlign: 'center'
  },
  h2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8400b8'
  },
  h3: {
    fontSize: 20,
    color: '#8400b8'
  },
  row: {
    marginTop: 20,
    padding: 10
  },
  flex: {
    flexDirection: "row",
    height: 100,
    alignItems: 'flex-end'
  },
  button: {
    margin: 30,
    flexDirection: "row",
    padding: 10,
    backgroundColor: '#bb4ce7',
    width: 180,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  gameoverButton: {
    margin: 30,
    marginVertical: 5,
    flexDirection: "row",
    padding: 10,
    backgroundColor: '#bb4ce7',
    width: 180,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scoreButton: {
    margin: 15,
    flexDirection: "row",
    padding: 10,
    backgroundColor: '#bb4ce7',
    width: 200,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color:"white",
    fontSize: 20,
    fontWeight: 'bold'
  },
  points: {
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginLeft: 17,
    marginRight: 15,
    textAlign: 'center',
    color: "white",
    fontWeight: 'bold'
  },
  dicepoints: {
    flexDirection: 'row',
    width: 350,
    alignItems: 'center'
  },
  total: {
    fontSize: 26,
    color: "white",
    fontWeight: 'bold'
  },
  bonus: {
    fontSize: 16,
    marginBottom: 10,
    color: "white"
  },
  scoreboard: {
    flex: 1,
    backgroundColor: '#dbc9e9',
    alignItems: 'center'
  },
  datatable: {
    width: 350,
    backgroundColor: "white",
    marginTop: 10,
    borderRadius: 5
  },
  loading: {
    color: "white",
    backgroundColor: "#ba87f5",
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 50
  }
});