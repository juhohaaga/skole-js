
var Course = React.createClass({

	//Alustus: Mikään kursseista ei ole edit -tilassa
	getInitialState: function() {
		return {editing: false}
	},

	//Vaihtaa vain kurssin editointi-tilan
	edit: function () {
		this.setState({editing: true});
	},
			
	//POISTO
	remove: function () {
		this.props.deleteFromBoard(this.props.index)
	}, 

	//TALLENNUS
	save: function () {
		this.props.updateCourseText(this.refs.newText.value, this.props.index);
		this.setState({editing: false});
	}, 

	//Tulostetaan kurssirivi
	//Näytetään vain buttonit 
	renderNormal: function () {
		return (
			<tr>	
      			<td className="extra-widthcolumn">{this.props.children}</td>
      			<td><button onClick={this.edit} className="btn-primary" >Muokkaa</button></td>
      			<td><button onClick={this.remove} className="btn-success" >Poista</button></td>
    		</tr>

		);
	},

	//Tulostetaan kurssiriville editointityökalut
	//Klikillä ajetaan save -funktio
	renderForm: function () {
		return (
			<div className="row">			
				<input type="text" lenght="30" className="form-control" ref="newText" defaultValue={this.props.children} />
				<button onClick={this.save} className="btn-success">Tallenna</button>
			</div>
		);
	},

	render: function () {
		if(this.state.editing) {
			return this.renderForm();
		} else {
			return this.renderNormal();
		}
	}
});



// Ruvetaan rakentamaan boardia
// 1. Haetaan aluksi kaikki kurssit taustalta
// 2. Funktiot kurssien hallintaan: Poisto ja update
// 3. Luupataan läpi kaikki kurssit, ja tulostetaan ne
// 4. Luodaan fronttiin vielä nappi, josta kursseja voi lisätä
//


var Board = React.createClass({

	//Tulostetaan olemassa olevat kurssit
	getInitialState: function () {
		return {
			courses: [
				'Opiskelu- ja työelämätaitojen kehittäminen, COM1TN010',
				'ICT and Business English, ENG1TN003',
				'Työvälineet myynnin ja palvelun ympäristössä, SAL1TN001'
			]
		}
	},

	//Functio, jolla lisätään kurssi listalle
	add: function (text) {
		var arr = this.state.courses;
		arr.push(text);
		this.setState({courses: arr})
	},

	//Funktio jolla poistetaan listalta
	removeCourse: function (i) {
		console.log('Remove course' + i);
		var arr = this.state.courses;
		arr.splice(i,1);
		this.setState({courses: arr})
	},

	//päivitys DOMiin
	updateCourse: function (newText, i) {
		console.log('updating course');
		var arr = this.state.courses;
		arr[i] = newText;
		this.setState({courses: arr})
	},

	//Define
	eachCourse: function (text, i) {
		return (
			<Course key={i} index={i} updateCourseText={this.updateCourse} deleteFromBoard={this.removeCourse}>
			{text}
			</Course>
		);
	},

	//Rendataan koko boardi ja jokainen yksittäinen kurssi
	render: function () {
		return (
			<div>
				<div className="row">
					<button onClick={this.add.bind(null, 'Course name or id')} className="btn-info create">Lisää uusi</button>
				</div>
			<div className="board">
				<div className="row">
		    		<table className="table">
		    			<tbody>
							{this.state.courses.map(this.eachCourse)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
	}

});

//
// Tulostetaan koko container
//
ReactDOM.render(<Board/>, document.getElementById('container'));

		