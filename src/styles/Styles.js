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
    },
    coordsContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        marginBottom: 30,
        minWidth: '90%',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    coordsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#495057',
    },
    coordText: {
        fontSize: 16,
        marginBottom: 8,
        color: '#6c757d',
        fontFamily: 'monospace',
    },
    statusText: {
        fontSize: 14,
        color: '#28a745',
        fontWeight: '500',
        marginTop: 10,
    },
    noLocationText: {
        fontSize: 16,
        color: '#6c757d',
        fontStyle: 'italic',
        textAlign: 'center',
    },
    buttonsContainer: {
        width: '90%',
        gap: 12,
    },
    startButton: {
        backgroundColor: '#28a745',
    },
    stopButton: {
        backgroundColor: '#dc3545',
    },
    clearButton: {
        backgroundColor: '#6c757d',
    },
    instructions: {
        marginTop: 30,
        backgroundColor: '#e9ecef',
        padding: 15,
        borderRadius: 8,
        width: '90%',
    },
    instructionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#495057',
    },
    instructionText: {
        fontSize: 14,
        color: '#6c757d',
        marginBottom: 5,
    },
    map: {
        width: '100%',
        height: 350,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#dee2e6',
    },
});

export default Styles;