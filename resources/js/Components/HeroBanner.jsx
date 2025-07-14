import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Container, Badge } from 'react-bootstrap';

export default function HeroBanner({ data }) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                when: "beforeChildren"
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.div
            className="hero-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <Container>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="text-center"
                >
                    {data?.title && (
                        <motion.h1
                            className="display-4 fw-bold text-white mb-3"
                            variants={itemVariants}
                        >
                            {data?.title}
                        </motion.h1>
                    )}
                    {data?.subtitle && (
                        <motion.p
                            className="lead text-white mb-4"
                            variants={itemVariants}
                        >
                            {data?.subtitle}
                        </motion.p>
                    )}
                    {data?.badge && (
                        <motion.div variants={itemVariants}>
                            <Badge bg="light" text="dark" className="fs-6 px-3 py-2">
                                {data.badge}
                            </Badge>
                        </motion.div>
                    )}
                    {data?.linkText && (
                        <motion.a variants={itemVariants}>
                            <Link as='button' className='btn btn-lg rounded-pill px-5 btn-primary-2' href={data.linkUrl}>
                                {data.linkText}
                            </Link>
                        </motion.a>
                    )}
                </motion.div>
            </Container>
        </motion.div>
    );
}