import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 'bold',
  },
  input: {
    marginVertical: 8,
    borderRadius: 5,
    backgroundColor: 'white',
    width: 200,
    padding: 8,
    fontSize: 14,
    borderColor: '#000',
    borderWidth: 1
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#333333',
  },
  button: {
    marginVertical: 8,
    backgroundColor: 'lightgray',
    padding: 10,
    width: 200,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 14,
    textAlign: 'center'
  },
  tinyText: {
    marginTop: 8,
    color: 'black',
    textDecorationLine: 'underline'
  },
  label: {
    textAlign: 'left',
    marginTop: 8,
    width: 200
  },
  contenedorCamara: {
        flex: 1,
    },
    camara: {
        flex: 1,
    },
    controles: {
        position: 'absolute',
        bottom: 50,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    botonCerrar: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botonCaptura: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circuloCaptura: {
        backgroundColor: 'white',
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    imagePlaceholder: {
      width: 200,
      height: 200,
      paddingVertical: 90,
      backgroundColor: 'rgba(0,0,0,.1)',
      marginTop: 4,
      textAlign: 'center'
    }
});

export default Styles;