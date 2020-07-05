/* eslint-disable no-else-return */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ListSubheader from '@material-ui/core/ListSubheader';
import Button from '@material-ui/core/Button';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { VariableSizeList } from 'react-window';
import {
  Typography, Container, Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, IconButton,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { borders } from '@material-ui/system';
import { toast } from 'react-toastify';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import 'normalize.css';
import './style.css';
import cnaes from './cnaes';

const LISTBOX_PADDING = 8; // px

function renderRow(props) {
  const { data, index, style } = props;
  return React.cloneElement(data[index], {
    style: {
      ...style,
      top: style.top + LISTBOX_PADDING,
    },
  });
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef((props, ref) => {
  const { children, ...other } = props;
  const itemData = React.Children.toArray(children);
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child) => {
    if (React.isValidElement(child) && child.type === ListSubheader) {
      return 48;
    }

    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

const Transition = React.forwardRef((props, ref) => <Slide direction="down" ref={ref} {...props} />);
const useStyles = makeStyles({
  listbox: {
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
});

const OPTIONS = cnaes;

const renderGroup = (params) => [
  <ListSubheader key={params.key} component="div">
    {params.group}
  </ListSubheader>,
  params.children,
];

export default function Virtualize() {
  const classes = useStyles();
  // variáveis do forumlário
  const [prestadorDeServico, setPrestadorDeServico] = useState('');
  const [cnae, setCnae] = useState('');
  const [area, setArea] = useState(0);
  const [areaTotal, setAreaTotal] = useState(0);
  const [cnaesSelecionados, setCnaesSelecionados] = useState([]);
  const [cargaIncendio, setCargaIncendio] = useState();
  const [edificacao, setEdificacao] = useState('');
  const [reuniaoDePublico, setReuniaoDePublico] = useState('false');
  const [lotacao, setLotacao] = useState('');
  const [aberturas, setAberturas] = useState('');
  const [pavimentos, setPavimentos] = useState('');
  const [subsolo, setSubsolo] = useState('');
  const [garagem, setGaragem] = useState('');
  const [liquidoInflamavel, setLiquidoInflamavel] = useState('');
  const [quantidadeLiquido, setquantidadeLiquido] = useState('');
  const [glp, setGlp] = useState('');
  const [capacidadeGlp, setCapacidadeGlp] = useState('');
  const [previa62251, setPrevia62251] = useState('false');
  const [previa62252, setPrevia62252] = useState('false');

  function reset() {
    setPrestadorDeServico('');
    setCnae('');
    setArea(0);
    setAreaTotal(0);
    setCnaesSelecionados([]);
    setCargaIncendio();
    setEdificacao('');
    setReuniaoDePublico('false');
    setLotacao('');
    setAberturas('');
    setPavimentos('');
    setSubsolo('');
    setGaragem('');
    setLiquidoInflamavel('');
    setquantidadeLiquido('');
    setGlp('');
    setCapacidadeGlp('');
    setPrevia62251('false');
    setPrevia62252('false');
  }
  // funções do formulário
  // TODO criar a lógica de verificação
  // CNAES que precisam de vistoria se for maior que 200m
  const cnaes62251 = ['B-1', 'B-2', 'C-3', 'E-1', 'E-4', 'E-5', 'E-6', 'F-1', 'F-2', 'F-3', 'F-4', 'F-5', 'F-6', 'F-7', 'F-8', 'F-9', 'F-10', 'F-11', 'H-2', 'H-3', 'H-4', 'H-5', 'J-2', 'J-3', 'J-4'];

  // CNAES que precisam de vistoria independente da área
  const cnaes62252 = ['L-1', 'L-2', 'L-3', 'M-2'];

  function cnaeToArray(stringCnae) {
    if (stringCnae == null || stringCnae == undefined) return undefined;
    return stringCnae.replace('CNAE:', '')
      .replace(', Descrição', '')
      .replace(', Divisão', '')
      .replace(', Carga de incêndio', '')
      .replace(', Área', '')
      .split(': ');
  }
  useEffect(() => {
    function calcCargaIncendio() {
      // verifica qual a maior carga de incendio conforme a nt01
      let maiorCarga = 0;
      cnaesSelecionados.map((valor) => {
        const result = (valor[3] * valor[4]);
        if (result > maiorCarga) {
          maiorCarga = result;
          setCargaIncendio(valor[3]);
        }

        // verifica se a divisão é local de reuniao de público
        if (valor[2].includes('F-')) {
          setReuniaoDePublico('true');
        } else {
          setReuniaoDePublico('false');
        }

        if (cnaes62251.some((e) => valor[2].includes(e)) && valor[4] > 200) {
          setPrevia62251('true');
        }

        if (cnaes62252.some((e) => valor[2].includes(e)) && valor[4] > 200) {
          setPrevia62252('true');
        }
        console.log(valor);
        return result;
      });
    }
    calcCargaIncendio();
  }, [cnaesSelecionados]);

  function verificarDispensa() {
    const dispensada = 'é DISPENSADO de Cercon, conforme NT-01/2020';
    const previa = 'NECESSITA de Cercon, conforme NT-01/2020 e pode ser enquadrado como CERTIFICAÇÃO PRÉVIA';
    const vistoria = 'NECESSITA de Cercon e é enquadrado como PROCESSO TÉCNICO.Necessita de vistoria no local, conforme NT-01/2020';

    console.log('area', areaTotal);
    console.log('ci', cargaIncendio);
    console.log('shop', edificacao);
    console.log('aberturas', aberturas);
    console.log('lotacao', lotacao);
    console.log('reuniao de publico', reuniaoDePublico);
    console.log('pavimentos', pavimentos);
    console.log('subsolo', subsolo);
    console.log('garagem', garagem);
    console.log('liquido', liquidoInflamavel);
    console.log('qtdliquido', quantidadeLiquido);
    console.log('glp', glp);
    console.log('qtdglp', capacidadeGlp);
    console.log('previa62251', previa62251);
    console.log('previa62252', previa62252);
    if (
      Number(areaTotal) <= 200
        && Number(cargaIncendio) <= 300
        && reuniaoDePublico == 'false'
        && (edificacao == 'independente' || edificacao == 'true')
        && aberturas == 'false'
        && lotacao == 'dispensado'
        && Number(pavimentos) <= 2
        && (subsolo == 'dispensado' || garagem == 'dispensado')
        && (liquidoInflamavel == 'dispensado' || quantidadeLiquido == 'dispensado')
        && (glp == 'dispensado' || capacidadeGlp == 'dispensado')
    ) {
      return dispensada;
    } else if (
      Number(areaTotal) <= 750
      && previa62251 == 'false'
      && previa62252 == 'false'
      && Number(pavimentos) <= 3
      && aberturas == 'false'
      && (subsolo == 'dispensado' || garagem == 'dispensado')
      && (lotacao == 'dispensado' || lotacao == 'previa')
      && (liquidoInflamavel == 'dispensado' || quantidadeLiquido == 'dispensado' || quantidadeLiquido == 'previa')
      && (glp == 'dispensado' || capacidadeGlp == 'dispensado' || capacidadeGlp == 'previa')

    ) {
      return previa;
    } else { return vistoria; }
  }

  function addCnae() {
    if (cnae === null || cnae == '') {
      toast.warn('É necessário informar o CNAE.');
      return;
    }
    if (area === '' || area == null) {
      toast.warn('É necessário informar a área.');
      return;
    }

    const string = `${cnae}, Área: ${area}`;
    setCnaesSelecionados([...cnaesSelecionados, cnaeToArray(string)]);
    setAreaTotal(Number(areaTotal) + Number(area));
    // setCnae('');
    // setArea('');
  }
  function removeCnae(e, index) {
    const novosCnaes = [...cnaesSelecionados];
    if (cnaes62251.some((el) => novosCnaes[index][2].includes(el)) && novosCnaes[index][4] > 200) {
      setPrevia62251('false');
    }
    if (cnaes62252.some((el) => novosCnaes[index][2].includes(el)) && novosCnaes[index][4] > 200) {
      setPrevia62252('false');
    }
    setAreaTotal(Number(areaTotal) - Number(novosCnaes[index][4]));
    novosCnaes.splice(index, 1);
    setCnaesSelecionados(novosCnaes);
  }
  // modal
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    verificarDispensa();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box mt={2}>

      <Container>
        <Typography variant="h5" align="center">Verificador de Necessidade de Cercon</Typography>

        <Grid container alignItems="center" spacing={2}>

          <Box component="span" border={1} borderColor="grey.400" p={1} m={1} borderRadius={4}>
            <Grid container>
              <Grid item lg={prestadorDeServico === 'false' || prestadorDeServico === '' ? 11 : 6} md={12} xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">A EMPRESA É NA RESIDÊNCIA DO EMPREENDEDOR, SEM RECEPÇÃO DE PESSOAS?</FormLabel>
                  <RadioGroup row value={prestadorDeServico} onChange={(e) => setPrestadorDeServico(e.target.value)}>
                    <FormControlLabel value="true" control={<Radio />} label="Sim" />
                    <FormControlLabel value="false" control={<Radio />} label="Não" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid hidden={prestadorDeServico === 'false' || prestadorDeServico === ''} item lg={6} xs={12}>
                <Typography variant="h5" align="center">Dispensado de CERCON</Typography>
                <Typography variant="body1" gutterBottom>
                  Conforme NT01/2020: 6.1.5.1.1 Considera-se   atividade   econômica   de baixo risco as atividades realizadas:
                  a.Na    residência    do    empreendedor,    sem recepção de pessoas;

                  A emissão do Certificado de Conformidade é dispensada para essa categoria, e é opitativa ao responsável.

                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid hidden={prestadorDeServico === 'true' || prestadorDeServico === ''} container alignItems="center" spacing={2}>
          <Grid item lg={8} xl={8} md={8} xs={12}>
            <Autocomplete
              id="virtualize-demo"
              value={cnae}
              onChange={(event, newValue) => {
                setCnae(newValue);
              }}
              style={{ width: '100%' }}
              disableListWrap
              classes={classes}
              ListboxComponent={ListboxComponent}
              renderGroup={renderGroup}
              options={OPTIONS}
              renderInput={(params) => <TextField {...params} variant="outlined" label="CNAE" />}
              renderOption={(option) => <Typography noWrap>{option}</Typography>}
            />
          </Grid>
          <Grid item lg={2} xl={2} md={2} xs={6}>
            <TextField
              variant="outlined"
              label="Área em m²"
              valeu={area}
              onChange={(e) => { setArea(e.target.value); }}
            />
          </Grid>
          <Grid item lg={2} xl={2} md={2} xs={6}>
            <Button
              type="button"
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {
                if (cnae !== '' || cnae === null) {
                  addCnae();
                }
              }}
            >
              Adicionar
            </Button>
          </Grid>
          <Grid item xs={12}>
            <p>
              {cnaesSelecionados.map((val, index) => (
                <li
                  key={index}
                >
                  {`CNAE:
                  ${val[0]},
                  Descrição: ${val[1]},
                  Divisão: ${val[2]},
                  Carga de Incêndio: ${val[3]},
                  Área: ${val[4]}m²`}
                  <IconButton
                    type="button"
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={(e) => removeCnae(e, index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </li>
              ))}
              Carga de incêndio considerada:
              {' '}
              {cargaIncendio}
            </p>
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">CASO FIQUE EM UM PRÉDIO/SHOPPING, ESTE POSSUI ATÉ 750m² DE ÁREA CONSTRUÍDA OU MAIS DE 03 PAVIMENTOS?</FormLabel>
              <RadioGroup row value={edificacao} onChange={(e) => setEdificacao(e.target.value)}>
                <FormControlLabel value="independente" control={<Radio />} label="É uma edificação independente" />
                <FormControlLabel value="true" control={<Radio />} label="Sim" />
                <FormControlLabel value="false" control={<Radio />} label="Não" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">POSSUI ABERTURAS PARA O INTERIOR DA EDIFICAÇÃO OU ESTABELECIMENTOS ADJACENTES?</FormLabel>
              <RadioGroup row value={aberturas} onChange={(e) => setAberturas(e.target.value)}>
                <FormControlLabel value="true" control={<Radio />} label="Sim" />
                <FormControlLabel value="false" control={<Radio />} label="Não" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">QUAL A LOTAÇÃO DO ESTABELECIMENTO?</FormLabel>
              <RadioGroup row value={lotacao} onChange={(e) => setLotacao(e.target.value)}>
                <FormControlLabel value="dispensado" control={<Radio />} label="Até 100 pessoas" />
                <FormControlLabel value="previa" control={<Radio />} label="de 101 a 200 pessoas" />
                <FormControlLabel value="vistoria" control={<Radio />} label="Acima de 201 pessoas" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">POSSUI QUANTOS PAVIMENTOS?</FormLabel>
              <TextField
                id="outlined-number"
                label="Number"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={(e) => setPavimentos(e.target.value)}
                value={pavimentos}
              />
            </FormControl>
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">POSSUI SUBSOLO?</FormLabel>
              <RadioGroup row value={subsolo} onChange={(e) => setSubsolo(e.target.value)}>
                <FormControlLabel value="previa" control={<Radio />} label="Sim" />
                <FormControlLabel value="dispensado" control={<Radio />} label="Não" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item hidden={subsolo === 'dispensado' || subsolo === ''} lg={12} md={12} xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">O SUBSOLO É UTILIZADO SOMENTE COMO GARAGEM / ESTACIONAMENTO?</FormLabel>
              <RadioGroup value={garagem} row onChange={(e) => setGaragem(e.target.value)}>
                <FormControlLabel value="dispensado" control={<Radio />} label="Sim" />
                <FormControlLabel value="vistoria" control={<Radio />} label="Não" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">POSSUI LÍQUIDO INFLAMÁVEL OU COMBUSTÍVEL NO ESTABELECIMENTO?</FormLabel>
              <RadioGroup row value={liquidoInflamavel} onChange={(e) => setLiquidoInflamavel(e.target.value)}>
                <FormControlLabel value="previa" control={<Radio />} label="Sim" />
                <FormControlLabel value="dispensado" control={<Radio />} label="Não" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item hidden={liquidoInflamavel === 'dispensado' || liquidoInflamavel === ''} lg={12} md={12} xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">QUAL A QUANTIDADE DE LÍQUIDO INFLAMÁVEL E/OU COMBUSTÍVEL QUE POSSUI?</FormLabel>
              <RadioGroup row value={quantidadeLiquido} onChange={(e) => setquantidadeLiquido(e.target.value)}>
                <FormControlLabel value="dispensado" control={<Radio />} label="Até 250 litros" />
                <FormControlLabel value="previa" control={<Radio />} label="Entre 251 e 500 litros" />
                <FormControlLabel value="vistoria" control={<Radio />} label="Mais de 501 litros" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">FAZ USO DE GLP?</FormLabel>
              <RadioGroup row value={glp} onChange={(e) => setGlp(e.target.value)}>
                <FormControlLabel value="vistoria" control={<Radio />} label="Sim" />
                <FormControlLabel value="dispensado" control={<Radio />} label="Não" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid hidden={glp === 'dispensado' || glp === ''} item lg={12} md={12} xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">QUAL A CAPACIDADE DE BOTIJÃO UTILIZADO?</FormLabel>
              <RadioGroup row value={capacidadeGlp} onChange={(e) => setCapacidadeGlp(e.target.value)}>
                <FormControlLabel value="dispensado" control={<Radio />} label="Até 13kg" />
                <FormControlLabel value="previa" control={<Radio />} label="de 14kg até 190kg" />
                <FormControlLabel value="vistoria" control={<Radio />} label="Acima de 191kg" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item align="center" xs={12}>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              size="large"
              style={{ minHeight: '56px', width: '30%' }}
              onClick={handleClickOpen}
            >
              Verificar
            </Button>
          </Grid>
          <Grid item align="center" xs={12}>
            <Button
              type="button"
              variant="outlined"
              color="danger"
              size="large"
              style={{ minHeight: '56px', width: '30%' }}
              onClick={reset}
            >
              Limpar Campos
            </Button>
          </Grid>
        </Grid>

      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionComponent={Transition}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-title">Este empreendimento:</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {verificarDispensa()}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Box>

  );
}