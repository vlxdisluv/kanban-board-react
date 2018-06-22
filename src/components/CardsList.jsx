import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ViewHeadline from '@material-ui/icons/ViewHeadline';
import AddBox from '@material-ui/icons/AddBox';
import Close from '@material-ui/icons/Close';
import Card from './Card';
import uuidv4 from 'uuid/v4';

const styles = theme => ({
  wrapList: {
    width: 270,
    height: '100%',
    backgroundColor: '#fafafa',
    padding: theme.spacing.unit,
    margin: '0px 8px 8px 8px',
  },
  listHeader: {
    flex: '0 0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.unit,
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  cardComposerTextarea: {
    fontSize: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    width: '100%',
    border: 'none',
    resize: 'none',
    minHeight: 70,
    borderRadius: 2,
    outline: 'none',
    boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
  },
  openCardComposer: {
    flex: '0 0 auto',
    textDecoration: 'none',
    display: 'block',
    color: '#2d2d2d',
    backgroundColor: 'rgba(35, 35, 35, 0.12)',
    padding: '10px',
    cursor: 'pointer',
    '&:hover': {
      color: '#6ba1ce',
    }
  },
  hide: {
    display: 'none',
  },
  buttonTransfer: {
    width: '30px',
    height: '30px',
    '&:hover': {
      cursor: 'grab',
    },
    '&:active': {
      cursor: 'grabbing',
    }
  },
  changeTitle: {
    padding: '4px 0px 3px 3px',
    borderRadius: '2px',
    border: '1px solid gray',
    width: 'calc(100% - 36px)',
    fontWeight: 'bold',
    fontSize: '14px',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  }
});

class CardsList extends Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
  }

  state = {
    inputText: '',
    editTitle: this.props.title,
    isEdit: false,
  };

  handleChange = (e) => {
    this.setState({
      inputText: e.target.value,
    });
  };

  hanldeAddCard = () => {
    const { addCard, handleClose, ...list,} = this.props;
    const { inputText } = this.state;

    addCard(list._id, uuidv4(), inputText);

    this.setState({
      inputText: '',
    });

    handleClose();
  }

  toggleOpen = (e) => {
    e.preventDefault();

    this.props.toggleOpen();
  }

  handleEditTitle = (e) => {
    e.preventDefault();
    const { value } = e.target;

    this.setState({ editTitle: value });
  }

  handleClickOnTitle = (e) => {
    this.setState({ isEdit: true });
  }

  handleBlur = () => {
    this.setState({ isEdit: false });
  }

  handlePressEnter = (e) => {
    if (e.key === 'Enter') {
      this.setState({ isEdit: false });
    }
  }

  render() {
    const { classes, title, cards, isOpen, handleClose } = this.props;
    const { inputText, editTitle, isEdit } = this.state;
    const isEditTitle = (
      <input 
        type='text' 
        value={editTitle} 
        className={classes.changeTitle} 
        onChange={this.handleEditTitle}
        ref={input => input && input.focus()}
      />
    );

    return (
      <Paper className={classes.wrapList} >
        <Typography 
          className={classes.listHeader} 
          variant="subheading" component="h3" 
          onClick={this.handleClickOnTitle} 
          onBlur={this.handleBlur}
          onKeyPress={this.handlePressEnter}
        >
          {isEdit ? isEditTitle : title}
          <IconButton className={classes.buttonTransfer}>
            <ViewHeadline />
          </IconButton>
        </Typography>

        {
          cards && cards.length ? (
            cards.map((card, id) => 
              <Card
                task={card.cardName} 
                key={id}
              />
            )
          ) : (
            console.log('Сards don\'t exist')
          )
        }

        <div className={classNames(classes.cardComposer, isOpen ? '' : classes.hide)}>
          <textarea 
            value={inputText} 
            onChange={this.handleChange}
            placeholder="Добавить карточку..." 
            className={classes.cardComposerTextarea}>
          </textarea>
          <IconButton onClick={this.hanldeAddCard}>
            <AddBox color="secondary" />
          </IconButton>
          <IconButton onClick={handleClose}>
            <Close color="secondary" />
          </IconButton>
        </div>

        <a className={classNames(classes.openCardComposer, isOpen ? classes.hide : '')}
          onClick={this.toggleOpen}>
          Добавить карточку...
        </a>
      </Paper>
    );
  }
}

export default withStyles(styles)(CardsList);
