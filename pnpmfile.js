const replace = (pkg, context, name, version, regex) => {
	const dep = pkg.dependencies[name]
	if (dep && (!regex || regex.test(dep))) {
		pkg.dependencies[name] = version
		context.log(`replacing ${pkg.name}'s ${name} dep ${dep} with ${version}`)
	}
}
const readPackage = (pkg, context) => {
	if (!pkg.dependencies) return pkg
	// Fix dependencies on babel 6
	replace(pkg, context, 'babel-core', '7.0.0-bridge.0', /^.?6/)
	replace(pkg, context, 'babel-runtime', 'next')
	replace(pkg, context, 'babel-types', 'npm:@babel/types@^7')
	return pkg
}

module.exports = {hooks: {readPackage}}
