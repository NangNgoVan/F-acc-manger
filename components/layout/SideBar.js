import Link from "next/link";
import React from "react";


class NavHeaderItem extends React.Component {
	render() {
		const { title } = this.props
		return (
			<li className="navigation-header">
				<span>{title}</span>
			</li>
		)
	}
}

class NavGroupItem extends React.Component {
	constructor(props) {
		super(props)
		this.navItemTree = []
		this.state = {
			navMenuIds: []
		}
		this.createNavItem = this.createNavItem.bind(this)
		this.onNavMenuItemCollapsed = this.onNavMenuItemCollapsed.bind(this)
	}

	onNavMenuItemCollapsed(e, key) {
		let l = key.length
		let navMenuIds = []
		const index = this.state.navMenuIds.indexOf(key)
		if (index != -1) {
			navMenuIds.push(...this.state.navMenuIds)
			navMenuIds.splice(index, 1)
		}
		else {
			while (l > 2) {
				navMenuIds.push(key.substring(0, l))
				l -= 2
			}
		}
		this.setState({
			navMenuIds: navMenuIds,
			navItemActiveId: this.props.activeId
		})
	}

	createNavItem(item, key, activeId) {
		const { icon, href, name, items, id } = item

		this.navItemTree[key] = this.navItemTree[key] || []

		if (Array.isArray(items) && (items.length > 0)) {
			{
				return <li key={key}
					className={activeId === id ? 'active' : null}>
					<a className="has-ul"
						onClick={(e) => this.onNavMenuItemCollapsed(e, key)}>
						<i className={icon}></i>
						{name}
					</a>
					<ul className="hidden-ul" style={{
						display: (this.state.navMenuIds.includes(key)) ? 'block' : 'none'
					}}>
						{
							items.map((child, index) => {
								const childKey = `${key}.${index}`

								if (!this.navItemTree[key].includes(childKey))
									this.navItemTree[key].push(childKey)

								return this.createNavItem(child, childKey, activeId)
							})
						}
					</ul>
				</li>
			}
		}
		
		return <li key={key}
			className={activeId === id ? 'active' : null}
		>
			<Link href={href}>
				<a onClick={(e) => this.props.onNavMenuItemClick(id)}>
					<i className={icon}></i>
					{name}
				</a>
			</Link>

		</li>
	}
	render() {
		const { name, items, activeId } = this.props
		return (
			<React.Fragment>
				<NavHeaderItem title={name} />
				{
					items.map((item, index) => {
						return this.createNavItem(item, `${this.props.groupId}.${index}`, activeId)
					})
				}
			</React.Fragment>
		)
	}
}

export default class SideBar extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			navItemActiveId: this.props.activeId||''
		}
		this.onNavMenuItemClick = this.onNavMenuItemClick.bind(this)
	}
	onNavMenuItemClick(navMenuId) {
		this.setState({
			navItemActiveId: navMenuId
		});
	}

	render() {
		let { data } = this.props
		if (!data) data = []
		return (
			<div className="sidebar sidebar-main sidebar-fixed">
				<div className="sidebar-content">
					<div className="sidebar-category sidebar-category-visible">
						<div className="category-content no-padding">
							<ul className="navigation navigation-main navigation-accordion">
								{data.map(({ groupName, items, id }, index) => {
									if (!groupName) return null
									return <NavGroupItem
										key={`${index}`}
										onNavMenuItemClick={(navMenuId) => this.onNavMenuItemClick(navMenuId)}
										groupId={`${index}`}
										id={this.props.id}
										name={groupName}
										activeId={this.state.navItemActiveId}
										items={items} />
								})}
							</ul>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
