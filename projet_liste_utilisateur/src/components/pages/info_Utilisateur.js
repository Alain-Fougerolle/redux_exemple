import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import Material UI //
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

// Components //
import PopoverList from "../popover/list_popover";
import PopoverModif from "../popover/modif_popover";
import TableTransaction from "../table/table_transaction";

// Containers //
import StatusUtilisateur from "../../redux/containers/statusUtilisateur";
import ChangeStatus from "../../redux/containers/changeStatus";

export default class Info extends Component {

    render() {
        return (
            <Grid
                className="App-Info"
                container
                direction="row"
                justify="center"
                alignItems="center"
            >

                <Paper className="Paper">
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                    >
                        <PopoverList />
                        {this.props.user
                            ? <PopoverModif />
                            : <div></div>
                        }
                    </Grid>

                    {this.props.user
                        ? <section className="App-Section-Info">
                            <div className="titreInfo">
                                <StatusUtilisateur id={this.props.user.id}/>
                                <h2>{this.props.user.prenom} {this.props.user.nom}</h2>
                            </div>
                            <p><span className="InfoModifiable">Adresse : </span> {this.props.user.rue} {this.props.user.codePostal} {this.props.user.ville}</p>
                            <p><span className="InfoModifiable">email : </span> {this.props.user.email} </p>
                            <p><span className="InfoModifiable">tel : </span> {this.props.user.tel}</p>
                            <ChangeStatus id={this.props.user.id}/>
                       
                            {this.props.user.transaction
                                ? <TableTransaction 
                                    transactions={this.props.user.transaction}
                                />

                                : <div>Pas de transactions</div>
                            }
                        </section>

                        : <p>Aucune Personne Sélectionner</p>
                    }
                </Paper>
            </Grid>
        );
    }
}

Info.propTypes = {
    user: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.object,

        PropTypes.shape({

            nom: PropTypes.string,
            prenom: PropTypes.string,
            rue: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string
            ]),

            codePostal: PropTypes.number,
            ville: PropTypes.string,
            email: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string
            ]),

            tel: PropTypes.number,
            transaction: PropTypes.arrayOf(PropTypes.object)
        }),
    ]),
};