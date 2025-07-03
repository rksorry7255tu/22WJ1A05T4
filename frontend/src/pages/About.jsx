// AboutUs.jsx

const AboutUs = () => {
  const teamMembers = [
    {
      id: 1,
      name: "John Doe",
      position: "CEO & Founder",
      bio: "Visionary leader with 15+ years in tech industry",
      img: "https://placehold.co/200x200?text=John+Doe",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "CTO",
      bio: "Engineering expert specializing in scalable systems",
      img: "https://placehold.co/200x200?text=Jane+Smith",
    },
    {
      id: 3,
      name: "Mike Johnson",
      position: "Lead Developer",
      bio: "Full-stack wizard passionate about clean code",
      img: "https://placehold.co/200x200?text=Mike+Johnson",
    },
    {
      id: 4,
      name: "Sarah Williams",
      position: "Marketing Director",
      bio: "Growth strategist with 10 years of digital marketing experience",
      img: "https://placehold.co/200x200?text=Sarah+Williams",
    },
  ];

  const stats = [
    { value: "10M+", label: "Links Created" },
    { value: "500K+", label: "Active Users" },
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Customer Support" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About QuickLink
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            The fastest, most reliable URL shortener trusted by businesses and
            individuals worldwide
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-white transform skew-y-1 -mb-6 z-10"></div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600">
              Founded in 2020, QuickLink began as a passion project to solve the
              growing need for simple, yet powerful URL management tools. What
              started as a small team of developers has grown into a leading
              platform serving millions of users worldwide with reliable and
              secure link shortening services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center mt-12">
            <div>
              <img
                src="https://placehold.co/600x400?text=Our+Office"
                alt="QuickLink office - modern workspace with collaborative areas"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Why We Exist
              </h3>
              <p className="text-gray-600 mb-4">
                In today's digital world, sharing content quickly and
                efficiently is more important than ever. We saw that existing
                URL shorteners were either too simplistic or overly complex, so
                we set out to create the perfect balance.
              </p>
              <p className="text-gray-600">
                Our mission is to empower creators, marketers, and businesses to
                share links beautifully while providing valuable insights into
                how those links perform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Our Core Values
            </h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="text-blue-500 text-4xl mb-4 flex justify-center">
                <FaLightbulb />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Innovation
              </h3>
              <p className="text-gray-600">
                We constantly push boundaries to deliver cutting-edge solutions
                that anticipate user needs.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="text-blue-500 text-4xl mb-4 flex justify-center">
                <FaChartLine />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Transparency
              </h3>
              <p className="text-gray-600">
                We believe in open communication and honest reporting about our
                services and data.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="text-blue-500 text-4xl mb-4 flex justify-center">
                <FaUsers />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                User-First
              </h3>
              <p className="text-gray-600">
                Every feature and decision starts with our users' needs at the
                core of our thinking.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="text-blue-500 text-4xl mb-4 flex justify-center">
                <FaHandshake />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Integrity
              </h3>
              <p className="text-gray-600">
                We uphold the highest ethical standards in all our business
                practices and partnerships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="p-6">
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-xl">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Meet Our Team
            </h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The brilliant minds behind QuickLink's success
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <img
                  src={member.img}
                  alt={`Portrait of ${member.name}, ${member.position}`}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-500 mb-3">{member.position}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to simplify your links?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of happy customers using QuickLink every day
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-200">
            Get Started for Free
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
