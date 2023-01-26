import React from 'react';
import CommonFunctions from '../functions'

// args
//   link
//   database
//   className
//   style
//   children
// events
//   onClick (gets called after links)

export default class Link extends React.Component{

  constructor(props)
  {
    super(props)

    this.handleLink = this.handleLink.bind(this);

  }

  handleLink(e) {


    e.preventDefault();

    let url = '';
    let newWindow = false;
    if (this.props.linkRaw) url = this.props.linkRaw;
    else
    {
      url = this.props.link.url;

      // check if link type is script if it is run the script instead
      if (this.props.link.type === 'Script')
      {
        eval(this.props.link.script);
        return;
      }

      /*if (this.props.link.type !== 'Custom' && this.props.link.type !== 'System')
      {
        let model = this.props.database.get(this.props.link.id, this.props.link.type)
        url = model && model.url_relative ? model.url_relative : url;
      }*/

      if (this.props.link.anchor) url += this.props.link.anchor

    }

    if (url.startsWith('http')) {
      let urlComponents = new URL(url);
      if (urlComponents.host.replace('www.' , '') != window.location.host.replace('www.', '')) newWindow = true;
    }


    let windowType = newWindow ? '_blank' : '_self';


    if (url.startsWith('/') && !newWindow)
    {
      window.open(url);
    }
    else window.open(url, windowType);

    if (this.props.onClick) this.props.onClick();
  }

  render() {

    let attributes = {
    	key: this.randomIndex,
      className: this.props.className,
      style: this.props.style,
      onClick: this.props.onClick
    }

    let shouldLink = !window.Architect &&
                     !CommonFunctions.inputToBool(this.props.shouldNotLink) &&
                     ((this.props.link && this.props.link.type !== 'None') || this.props.linkRaw);

    if (shouldLink) {

        attributes.href = this.props.linkRaw ? this.props.linkRaw : this.props.link.url
        attributes.onClick = this.handleLink
        return <a {...attributes}>{this.props.children}</a>
    }
    else return <span {...attributes}>{this.props.children}</span>

  }
}
